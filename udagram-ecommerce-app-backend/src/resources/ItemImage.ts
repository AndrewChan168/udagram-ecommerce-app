import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import Jimp from 'jimp';

import {ImageDoc} from '../models/doc/ImageDoc';

const urlExpiration = process.env.SIGNED_URL_EXPIRATION

class ItemImage{
    constructor(
        private readonly docClient:DocumentClient,
        private readonly tableName:string,
        private readonly itemIdIndex:string,
        private readonly s3:AWS.S3,
        private readonly imageBucketName:string,
        private readonly thumbnailBucketName:string,
    ){}

    getImageBucketName():string{
        return this.imageBucketName;
    }

    getThumbnailBucketName():string{
        return this.thumbnailBucketName;
    }

    async create(itemImageDoc:ImageDoc):Promise<string>{
        console.log(`inside resources/ItemImage.create(itemImageDoc), itemImageDoc:`, itemImageDoc);
        await this.createDoc(itemImageDoc);
        return this.getUploadUrl(itemImageDoc.imageId);
    }

    async createDoc(itemImageDoc:ImageDoc){
        await this.docClient.put({
            TableName: this.tableName,
            Item:itemImageDoc
        }).promise();
    }

    async delete(imageId:string){
        await this.deleteImage(imageId);
        await this.deleteThumbnail(imageId);
        await this.deleteDoc(imageId);
    }

    private async deleteImage(imageId:string){
        await this.s3.deleteObject({
            Bucket:this.imageBucketName,
            Key:imageId,
        }).promise();
    }

    private async deleteThumbnail(imageId:string){
        await this.s3.deleteObject({
            Bucket:this.thumbnailBucketName,
            Key:imageId,
        }).promise();
    }

    private async deleteDoc(imageId:string){
        await this.docClient.delete({
            TableName:this.tableName,
            Key:{imageId},
        }).promise();
    }

    async getDocByImageId(imageId:string):Promise<ImageDoc>{
        const result = await this.docClient.get({
            TableName: this.tableName,
            Key:{ imageId }
        }).promise();

        return result.Item as ImageDoc;
    }

    async getDocsByItemId(itemId:string):Promise<ImageDoc[]>{
        const result = await this.docClient.query({
            TableName: this.tableName,
            IndexName: this.itemIdIndex,
            KeyConditionExpression: 'itemId=:itemId',
            ExpressionAttributeValues: {
                ':itemId':itemId
            }
        }).promise()
        console.log(`inside resource/ItemImage.getDocsByItemId(), result.Items:`, result.Items);
        return result.Items as ImageDoc[];
    }

    async getImage(imageId:string):Promise<Jimp>{
        const response = await this.s3.getObject({
            Bucket:this.imageBucketName,
            Key:imageId,
        }).promise();

        const body = response.Body as string;

        return await Jimp.read(body);
    }

    async getUploadUrl(imageId:string):Promise<string>{
        const signedUrl = await this.s3.getSignedUrl('putObject', {
            Bucket:this.imageBucketName,
            Key:imageId,
            Expires: parseInt(urlExpiration),
        });

        return signedUrl;
    }

    async createResizedImage(imageId:string, imageBuffer:Buffer){
        try{
            await this.s3.putObject({
                Bucket:this.thumbnailBucketName,
                //Key: `${imageId}.jpeg`,
                Key:imageId,
                Body:imageBuffer,
            }).promise();
        }catch(err){
            console.log(`error in ItemImage.createResizedImage() method: ${err.message}`);
        }
    }
}

export const itemImage = new ItemImage(
    new AWS.DynamoDB.DocumentClient(),
    process.env.ITEM_IMAGES_TABLE,
    process.env.ITEM_ID_INDEX,
    new AWS.S3({signatureVersion: 'v4'}),
    process.env.IMAGES_S3_BUCKET,
    process.env.THUMBNAILS_S3_BUCKET,
)
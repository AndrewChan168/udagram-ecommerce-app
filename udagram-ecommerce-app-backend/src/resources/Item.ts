import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { ItemDoc } from '../models/doc/ItemDoc';
import { UpdateItemJson } from '../models/http/UpdateItemJson';

class Item{
    constructor(
        private readonly docClient:DocumentClient,
        private readonly tableName: string,
        private readonly brandIdIndex:string,
    ){}

    async create(item:ItemDoc){
        await this.docClient.put({
            TableName: this.tableName,
            Item:item
        }).promise();
    }

    async delete(itemId:string){
        await this.docClient.delete({
            TableName:this.tableName,
            Key:{itemId},
        })
    }

    async update(itemId:string, attrName:string, attrValue:string){
        await this.docClient.update({
            TableName:this.tableName,
            ReturnValues: "ALL_NEW",
            Key:{itemId},
            UpdateExpression:`SET ${attrName}=:${attrValue}`
        }).promise();
    }

    async getByItemId(itemId:string):Promise<ItemDoc>{
        const result = await this.docClient.get({
            TableName: this.tableName,
            Key:{ itemId }
        }).promise()

        return result.Item as ItemDoc;
    }

    async getItemsByBrandId(brandId:string):Promise<ItemDoc[]>{
        const result = await this.docClient.query({
            TableName: this.tableName,
            IndexName: this.brandIdIndex,
            KeyConditionExpression: 'brandId=:brandId',
            ExpressionAttributeValues: {
                ':brandId':brandId
            }
        }).promise();
        return result.Items as ItemDoc[];
    }

    async patchItem(updateItemJson:UpdateItemJson){
        const itemId = updateItemJson.itemId
        const result = await this.docClient.update({
            TableName: this.tableName,
            Key: { itemId },
            UpdateExpression: "set itemName=:itemName, price=:price, introduction=:introduction",
            ExpressionAttributeValues: {
                ':itemName':updateItemJson.itemName,
                ':price':updateItemJson.price,
                ':introduction':updateItemJson.introduction,
            }
        }).promise();
        console.log(`Patch result:`, result);
    }

    async patchItemWindowImageId(itemId:string, windowImageId:string){
        const result = await this.docClient.update({
            TableName: this.tableName,
            Key: { itemId },
            UpdateExpression: "set windowImageId=:windowImageId",
            ExpressionAttributeValues: {
                ':windowImageId':windowImageId
            }
        }).promise();
        console.log(`Patch window image result:`, result);
    }
}

export const item = new Item(
    new AWS.DynamoDB.DocumentClient(),
    process.env.ITEMS_TABLE,
    process.env.BRAND_ID_INDEX,
);
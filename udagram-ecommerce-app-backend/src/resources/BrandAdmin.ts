import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import {BrandAdminDoc} from '../models/doc/BrandAdminDoc';

class BrandAdmin{
    constructor(
        private readonly docClient:DocumentClient,
        private readonly tableName:string,
        private readonly brandAdminIdIndex:string,
        private readonly brandAdminBrandIdIndex:string,
    ){}

    async create(brandAdmin:BrandAdminDoc){
        console.log(`In resouces/BrandAdmin, brandAdmin:`, brandAdmin);
        await this.docClient.put({
            TableName: this.tableName,
            Item:brandAdmin
        }).promise();
    }

    async getByJWTSub(jwtSub:string):Promise<BrandAdminDoc>{
        console.log(`In resource/BrandAdmin.getByJWTSub(), jwtSub:`, jwtSub);
        const result = await this.docClient.get({
            TableName: this.tableName,
            Key:{ jwtSub }
        }).promise()
        console.log(`In resource/BrandAdmin.getByJWTSub() after docClient.get(), BrandAdminDoc:`, result.Item);
        return result.Item as BrandAdminDoc;
    }

    async getByAdminId(adminId:string):Promise<BrandAdminDoc>{
        console.log(`In resource/BrandAdmin.getByAdminId(), adminId:`, adminId);
        /*
        const result = await this.docClient.get({
            TableName: this.tableName,
            Key:{adminId},
        }).promise();
        */
       const result = await this.docClient.query({
        TableName:this.tableName,
        IndexName:this.brandAdminIdIndex,
        KeyConditionExpression:"adminId=:adminId",
        ExpressionAttributeValues:{
            ':adminId':adminId
        }
       }).promise();
        console.log(`In resource/BrandAdmin.getByAdminId() after docClient.query(), BrandAdminDoc[]:`, result.Items);
        return result.Items[0] as BrandAdminDoc;
    }

    async getAdminsByBrandId(brandId:string):Promise<BrandAdminDoc[]>{
        const result = await this.docClient.query({
            TableName:this.tableName,
            IndexName:this.brandAdminBrandIdIndex,
            KeyConditionExpression:"brandId=:brandId",
            ExpressionAttributeValues:{
                ':brandId':brandId
            }
        }).promise();

        return result.Items as BrandAdminDoc[];
    }
}

export const brandAdmin = new BrandAdmin(
    new AWS.DynamoDB.DocumentClient(),
    process.env.BRAND_ADMINS_TABLE,
    process.env.BRAND_ADMIN_ID_INDEX,
    process.env.BRAND_ADMIN_BRAND_ID_INDEX,
);
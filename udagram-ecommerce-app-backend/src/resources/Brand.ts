import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import {BrandDoc} from '../models/doc/BrandDoc' 

class Brand{
    constructor(
        private readonly docClient:DocumentClient,
        private readonly tableName: string,
    ){}

    async create(brand:BrandDoc){
        await this.docClient.put({
            TableName: this.tableName,
            Item:brand
        }).promise()
    }

    async getByBrandId(brandId:string):Promise<BrandDoc>{
        const result = await this.docClient.get({
            TableName:this.tableName,
            Key: {
                brandId: brandId
            }
        }).promise();
        return result.Item as BrandDoc
    }

    async getAll():Promise<BrandDoc[]>{
        const result = await this.docClient.scan({
            TableName: this.tableName
        }).promise();
        return result.Items as BrandDoc[];
    }

    async update(brand:BrandDoc):Promise<BrandDoc>{
        await this.docClient.update({
            TableName:this.tableName,
            Key: {'brandId':brand.brandId},
            UpdateExpression: "set brandName=:brandName and description=:description",
            ExpressionAttributeValues: {
                ':brandName':brand.brandName,
                ':description':brand.description
            },
            ReturnValues:"ALL_NEW"
        }).promise();
        return this.getByBrandId(brand.brandId);
    }
}

export const brand:Brand = new Brand(
    new AWS.DynamoDB.DocumentClient(),
    process.env.BRANDS_TABLE
);
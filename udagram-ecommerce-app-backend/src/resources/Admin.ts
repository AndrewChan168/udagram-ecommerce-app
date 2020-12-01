import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { AdminDoc } from './../models/doc/AdminDoc';

class Admin{
    constructor(
        private readonly docClient:DocumentClient,
        private readonly tableName: string,
        private readonly adminIdIndex:string,
    ){}

    async create(admin:AdminDoc){
        await this.docClient.put({
            TableName: this.tableName,
            Item:admin
        }).promise();
    }

    async getByJWTSub(jwtSub:string):Promise<AdminDoc>{
        const result = await this.docClient.get({
            TableName: this.tableName,
            Key:{ jwtSub }
        }).promise();

        return result.Item as AdminDoc;
    }

    async getByAdminId(adminId:string):Promise<AdminDoc>{
        const result = await this.docClient.query({
            TableName: this.tableName,
            IndexName: this.adminIdIndex,
            KeyConditionExpression: 'adminId=:adminId',
            ExpressionAttributeValues: {
                ':adminId':adminId
            }
        }).promise();
        return result.Items[0] as AdminDoc;
    }
};

export const admin:Admin = new Admin(
    new AWS.DynamoDB.DocumentClient(),
    process.env.ADMINS_TABLE,
    process.env.ADMIN_ID_INDEX,
);
import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { MemberDoc } from '../models/doc/MemberDoc';

class Member{
    constructor(
        private readonly docClient:DocumentClient,
        private readonly tableName: string,
        private readonly oauthIdIndex:string,
    ){}

    async create(member:MemberDoc){
        await this.docClient.put({
            TableName: this.tableName,
            Item:member
        }).promise();
    }

    async getByMemberId(memberId:string):Promise<MemberDoc>{
        const result = await this.docClient.get({
            TableName: this.tableName,
            Key:{
                memberId:memberId
            }
        }).promise();

        return result.Item as MemberDoc;
    }

    async getByOauthId(oauthId:string):Promise<MemberDoc>{
        /*
        const result = await this.docClient.query({
            TableName: this.tableName,
            IndexName: this.oauthIdIndex,
            KeyConditionExpression: 'oauth=:oauth',
            ExpressionAttributeValues: {
                ':oauth':oauthId,
            }
        }).promise();

        return result.Items[0] as MemberDoc;
        */
        const result = await this.docClient.get({
            TableName: this.tableName,
            Key:{
                oauth:oauthId
            }
       }).promise();

       return result.Item as MemberDoc;
    }

    async getByEmail(email:string):Promise<MemberDoc[]>{
        const result = await this.docClient.query({
            TableName: this.tableName,
            IndexName: this.oauthIdIndex,
            KeyConditionExpression: 'email=:email',
            ExpressionAttributeValues: {
                ':email':email,
            }
        }).promise();

        return result.Items as MemberDoc[];
    }
}

export const member = new Member(
    new AWS.DynamoDB.DocumentClient(),
    process.env.MEMBERS_TABLE,
    process.env.OAUTH_ID_INDEX,
);

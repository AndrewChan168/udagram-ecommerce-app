import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import {InvoiceDoc} from './../models/doc/InvoiceDoc';

class Invoice{
    constructor(
        private readonly docClient:DocumentClient,
        private readonly tableName: string,
        private readonly memberIdIndex:string,
        //private readonly InvoiceStageIndex:string,
    ){}

    async create(invoic:InvoiceDoc){
        await this.docClient.put({
            TableName: this.tableName,
            Item:invoic
        }).promise();
    };

    async getByInvoiceId(invoiceId:string):Promise<InvoiceDoc>{
        const result = await this.docClient.get({
            TableName:this.tableName,
            Key:{ invoiceId }
        }).promise()

        return result.Item as InvoiceDoc;
    }

    async getByMemberId(memberId:string):Promise<InvoiceDoc[]>{
        const result = await this.docClient.query({
            TableName:this.tableName,
            IndexName:this.memberIdIndex,
            KeyConditionExpression:"memberId=:memberId",
            ExpressionAttributeValues:{
                ':memberId':memberId
            }
        }).promise();

        return result.Items as InvoiceDoc[];
    }
}

export const invoice = new Invoice(
    new AWS.DynamoDB.DocumentClient(),
    process.env.INVOICES_TABLE,
    process.env.MEMBER_ID_INDEX,
    //process.env.InvoiceStageIndex,
);
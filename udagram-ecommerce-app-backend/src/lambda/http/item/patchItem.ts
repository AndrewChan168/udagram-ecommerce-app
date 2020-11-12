import 'source-map-support';
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { UpdateItemJson } from '../../../models/http/UpdateItemJson';
import { ResponseItemDetailJson } from '../../../models/http/ResponseItemDetailJson';
import { updateItemDoc } from '../../../businessLogic/Item';

export const handler:APIGatewayProxyHandler = async(event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    console.log(`handling patchItem event, `, event);
    const itemId = event.pathParameters.itemId;

    const parseBody = JSON.parse(event.body);
    console.log(`Parse Body`, parseBody);

    const updateItemJson:UpdateItemJson = { ...parseBody, itemId };

    try{
        const itemDoc:ResponseItemDetailJson = await updateItemDoc(updateItemJson);
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                item:itemDoc
            })
        }
    }catch(err){
        return {
            statusCode: 500,
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            body:err.message
        }
    }
}
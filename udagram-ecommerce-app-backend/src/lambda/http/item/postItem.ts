import 'source-map-support'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import {CreateItemJson} from '../../../models/http/CreateItemJson';
import {createItem} from '../../../businessLogic/Item'

export const handler:APIGatewayProxyHandler = async(event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    console.log(`handling postItem event, `, event);
    const parseBody = JSON.parse(event.body);
    console.log(`Parse Body`, parseBody);

    const createItemJson = parseBody as CreateItemJson;
    console.log(`Create-Item-Json`, createItemJson);

    try{
        const createdItem = await createItem(createItemJson);
        console.log(`Created Item`, createdItem);
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                item:createdItem
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
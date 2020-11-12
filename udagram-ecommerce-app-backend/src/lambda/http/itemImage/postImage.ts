import 'source-map-support'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { CreateItemImageJson } from '../../../models/http/CreateItemImageJson';
import { createItemImageDoc } from '../../../businessLogic/ItemImage';
import { ResponseItemImageJson } from '../../../models/http/ResponseItemImageJson';

export const handler:APIGatewayProxyHandler = async(event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    console.log(`handling postImage event, `, event);

    const parseBody = JSON.parse(event.body)
    const createItemImageJson:CreateItemImageJson = parseBody

    try{
        const responseItemImageJson:ResponseItemImageJson = await createItemImageDoc(createItemImageJson)
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                itemImage:responseItemImageJson
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
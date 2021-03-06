import 'source-map-support'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { ResponseItemDetailJson } from '../../../models/http/ResponseItemDetailJson';
import { getItemDetail } from '../../../businessLogic/Item';

export const handler:APIGatewayProxyHandler = async(event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    console.log(`handling getItem event, `, event);

    const itemId = event.pathParameters.itemId

    try{
        const itemDetailJson:ResponseItemDetailJson = await getItemDetail(itemId);
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                item:itemDetailJson
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
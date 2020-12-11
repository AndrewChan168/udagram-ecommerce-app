import 'source-map-support'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
//import { getSubject } from '../../../businessLogic/Auth'

import { getImageDocsByItemId } from '../../../businessLogic/ItemImage';
import { ImageDoc } from './../../../models/doc/ImageDoc';

export const handler:APIGatewayProxyHandler = async(event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    console.log(`handling getImageDocs event, `, event);

    const itemId = event.pathParameters.itemId;

    try{
        const imageDocs:ImageDoc[] = await getImageDocsByItemId(itemId);
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                images:imageDocs
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
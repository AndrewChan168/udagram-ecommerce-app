import 'source-map-support'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { deleteImageByImageId } from '../../../businessLogic/ItemImage';
import { updateItemWindowImage } from '../../../businessLogic/Item';

import { CreateItemImageJson } from '../../../models/http/CreateItemImageJson';
import { createItemImageDoc } from '../../../businessLogic/ItemImage';
import { ResponseItemImageJson } from '../../../models/http/ResponseItemImageJson';

export const handler:APIGatewayProxyHandler = async(event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    console.log(`handling patchImage event, `, event);
    const imageId = event.pathParameters.imageId

    const parseBody = JSON.parse(event.body)
    const createItemImageJson:CreateItemImageJson = parseBody

    try{
        await deleteImageByImageId(imageId);
    }catch(err){
        return {
            statusCode: 500,
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            body:err.message
        }
    }

    try{
        const responseItemImageJson:ResponseItemImageJson = await createItemImageDoc(createItemImageJson);
        await updateItemWindowImage(createItemImageJson.itemId, responseItemImageJson.imageId);
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
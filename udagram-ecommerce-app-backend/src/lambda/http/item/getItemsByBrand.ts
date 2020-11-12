import 'source-map-support'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import {ResponseItemBriefJson} from '../../../models/http/ResponseItemBriefJson';
import {getListOfItemsBrief} from '../../../businessLogic/Item'

export const handler:APIGatewayProxyHandler = async(event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    console.log(`handling getItemsByBrand event, `, event);
    const brandId = event.pathParameters.brandId
    

    try{
        const itemBriefJsons = await getListOfItemsBrief(brandId) as ResponseItemBriefJson[];
        console.log(`ResponseItemBriefJson: `, itemBriefJsons);
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                items:itemBriefJsons
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
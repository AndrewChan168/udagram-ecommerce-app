import 'source-map-support'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { getListOfItemsBriefByJWTSub } from '../../../businessLogic/Item';
import { ResponseItemBriefJsons } from '../../../models/http/ResponseItemBriefJson';
import { getSubject } from '../../../businessLogic/Auth'

export const handler:APIGatewayProxyHandler = async(event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    console.log(`handling getItemsByBrandAdmin event, `, event);

    const authHeader = event.headers.Authorization
    console.log(`Authorization head: `, authHeader);
    const jwtSub = await getSubject(authHeader);
    console.log(`sub of decoded payload: ${jwtSub}`);

    try{
        const itemBriefJsons = await getListOfItemsBriefByJWTSub(jwtSub) as ResponseItemBriefJsons[];
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(itemBriefJsons)
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
import 'source-map-support'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { getSubject } from '../../../businessLogic/Auth'
import { CreateAdminJson } from '../../../models/http/CreateAdminJson';
import {creatAdmin} from '../../../businessLogic/Admin';

export const handler:APIGatewayProxyHandler = async(event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    console.log(`handling postAdmin event, `, event);

    const authHeader = event.headers.Authorization
    console.log(`Authorization head: `, authHeader);
    const jwtSub = await getSubject(authHeader);
    console.log(`sub of decoded payload: ${jwtSub}`);

    const parseBody = JSON.parse(event.body);
    const createAdminJson = parseBody as CreateAdminJson;

    try{
        const createdAdminDoc = await creatAdmin(createAdminJson);
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                admin:createdAdminDoc
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
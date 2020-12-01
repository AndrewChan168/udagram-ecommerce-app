import 'source-map-support'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { getSubject } from '../../../businessLogic/Auth';
import { getAdminByJWTSub } from '../../../businessLogic/Admin';
import { AdminDoc } from '../../../models/doc/AdminDoc';

export const handler:APIGatewayProxyHandler = async(event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    console.log(`handling getAdmin event, `, event);

    const authHeader = event.headers.Authorization
    console.log(`Authorization head: `, authHeader);
    const jwtSub = await getSubject(authHeader);
    console.log(`sub of decoded payload: ${jwtSub}`);

    try{
        const responseAdminDoc:AdminDoc = await getAdminByJWTSub(jwtSub);
        console.log(`responseAdminDoc: `, responseAdminDoc);
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                admin:responseAdminDoc
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
import 'source-map-support'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { decodeToken, getToken, getJwks } from '../../../businessLogic/Auth'

export const handler:APIGatewayProxyHandler = async(event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    console.log(`handling getDecode event, `, event);

    const accessToken =  getToken(event.headers.Authorization);
    console.log(`access-token, `, accessToken);

    try{
        const jwks = await getJwks();
        console.log('JWKS, ', jwks)
        const decodedToken = decodeToken(accessToken, jwks);
        console.log(`decoded token, `, decodedToken);
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                payload: decodedToken
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
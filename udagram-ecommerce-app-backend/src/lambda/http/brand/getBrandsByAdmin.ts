import 'source-map-support';
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { getSubject } from '../../../businessLogic/Auth';
import { getBrandsByJWTSub } from '../../../businessLogic/Brand';
import { BrandDoc } from '../../../models/doc/BrandDoc';


export const handler:APIGatewayProxyHandler = async(event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    console.log(`handling getBrandsByAdmin event, `, event);

    const authHeader = event.headers.Authorization
    console.log(`Authorization head: `, authHeader);
    const jwtSub = await getSubject(authHeader);
    console.log(`sub of decoded payload: ${jwtSub}`);


    try{
        const brands:BrandDoc[] = await getBrandsByJWTSub(jwtSub);
        console.log(`getback brandDocs: `, brands);
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                brands
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
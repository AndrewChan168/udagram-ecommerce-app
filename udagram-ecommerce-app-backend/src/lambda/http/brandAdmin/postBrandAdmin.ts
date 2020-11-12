import 'source-map-support'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { CreateBrandAdminJson } from '../../../models/http/CreateBrandAdminJson';
import { createAdmin } from '../../../businessLogic/BrandAdmin';


export const handler:APIGatewayProxyHandler = async(event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    console.log(`handling postBrandAdmin event, `, event);

    const parseBody = JSON.parse(event.body);
    console.log('parsed http body:', parseBody);

    const createBrandAdminJson = parseBody as CreateBrandAdminJson;

    try{
        const createdBrandAdminDoc = await createAdmin(createBrandAdminJson);
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                brandAdmin:createdBrandAdminDoc
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
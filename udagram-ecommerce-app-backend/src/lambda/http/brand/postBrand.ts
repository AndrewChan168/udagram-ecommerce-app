import 'source-map-support'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import {CreateBrandJson} from '../../../models/http/CreateBrandJson';
import {createBrand} from '../../../businessLogic/Brand';

export const handler:APIGatewayProxyHandler = async(event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    console.log(`handling postBrand event, `, event);
    const parseBody = JSON.parse(event.body)
    console.log('parsed http body:', parseBody)

    const createBrandJson = parseBody as CreateBrandJson;

    try{
        const createdBrand = await createBrand(createBrandJson);
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                brand:createdBrand
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
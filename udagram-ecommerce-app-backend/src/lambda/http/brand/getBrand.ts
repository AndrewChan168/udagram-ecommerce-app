import 'source-map-support'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import {BrandDoc} from '../../../models/doc/BrandDoc';
import {getBrandById} from '../../../businessLogic/Brand'

export const handler:APIGatewayProxyHandler = async(event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    console.log('Handling getBrand event', event);

    const brandId = event.pathParameters.brandId;
    console.log(`brandId: ${brandId}`);

    try{
        const brand:BrandDoc = await getBrandById(brandId)
        console.log('get person successfully by personId: ', brandId)
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                brand
            })
        }
    }catch(err){
        console.log('error on getPerson event: ', err.message)
        return {
            statusCode: 500,
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            body:err.message
        }
    }    
}
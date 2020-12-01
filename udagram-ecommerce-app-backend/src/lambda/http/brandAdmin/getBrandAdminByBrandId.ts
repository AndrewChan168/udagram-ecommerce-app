import 'source-map-support'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getByBrandId } from './../../../businessLogic/BrandAdmin';
import { BrandAdminDoc } from './../../../models/doc/BrandAdminDoc';
//import { getSubject } from '../../../businessLogic/Auth'

export const handler:APIGatewayProxyHandler = async(event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    console.log(`handling getBrandAdminByBrandId event, `, event);

    const brandId = event.pathParameters.brandId;

    try{
        const brandAdmins:BrandAdminDoc[] = await getByBrandId(brandId);
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                brandAdmins
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
import 'source-map-support'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { getSubject } from '../../../businessLogic/Auth';
import {CreateBrandJson} from '../../../models/http/CreateBrandJson';
import {createBrand} from '../../../businessLogic/Brand';
import {createBrandAdmin} from '../../../businessLogic/BrandAdmin';
import {CreateBrandAdminJson} from '../../../models/http/CreateBrandAdminJson';

export const handler:APIGatewayProxyHandler = async(event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    console.log(`handling postBrand event, `, event);

    const authHeader = event.headers.Authorization
    console.log(`Authorization head: `, authHeader);
    const jwtSub = await getSubject(authHeader);
    console.log(`sub of decoded payload: ${jwtSub}`);

    const parseBody = JSON.parse(event.body)
    console.log('parsed http body:', parseBody)

    const createBrandJson = parseBody as CreateBrandJson;
    console.log(`createBrandJson: `, createBrandJson);
    try{
        const createdBrand = await createBrand(createBrandJson);
        console.log(`createdBrand: `, createdBrand);
        const createBrandAdminJson = { jwtSub, brandId:createdBrand.brandId } as CreateBrandAdminJson;
        console.log(`createBrandAdminJson: `, createBrandAdminJson);
        await createBrandAdmin(createBrandAdminJson);
        console.log('createAdmin succeed')
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
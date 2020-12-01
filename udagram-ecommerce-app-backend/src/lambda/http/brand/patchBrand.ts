import 'source-map-support'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { BrandDoc } from './../../../models/doc/BrandDoc';
import { patchBrand } from './../../../businessLogic/Brand';
 
export const handler:APIGatewayProxyHandler = async(event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=>{
    console.log(`handling patchBrand event, `, event);
    
    const parseBody = JSON.parse(event.body)
    const patchingBrand = parseBody as BrandDoc;
    console.log(`patchingBrand: `, patchingBrand);

    try{
        const brand = await patchBrand(patchingBrand);
        console.log(`brand: `, patchingBrand)
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
        return {
            statusCode: 500,
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            body:err.message
        }
    }
}
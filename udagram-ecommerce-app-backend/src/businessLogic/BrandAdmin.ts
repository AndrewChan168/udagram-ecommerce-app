import * as uuid from 'uuid';

import {brandAdmin} from '../resources/BrandAdmin';
import {CreateBrandAdminJson} from '../models/http/CreateBrandAdminJson';
import {BrandAdminDoc} from '../models/doc/BrandAdminDoc';
import {getAdminByJWTSub} from './Admin'

export async function createBrandAdmin(createBrandAdminJson:CreateBrandAdminJson):Promise<BrandAdminDoc>{
    const pairId = uuid.v4();
    const brandId = createBrandAdminJson.brandId;
    const adminId = (await getAdminByJWTSub(createBrandAdminJson.jwtSub)).adminId;
    const putDoc:BrandAdminDoc = {
        adminId,
        pairId,
        brandId
    }
    await brandAdmin.create(putDoc);
    return putDoc;
}

/*
export async function isAdminOfBrand(adminId:string, brandId:string):Promise<Boolean>{
    const adminDocs:BrandAdminDoc[] = await getAdminsByBrand(brandId);
    //const filteredAdminDocs = adminDocs.filter((item, index, array)=>(item.adminId === adminId));
    const filteredAdminDocs = adminDocs.filter(item=>(item.adminId === adminId));
    return filteredAdminDocs.length>=1;
}
*/

export async function getByBrandId(brandId:string):Promise<BrandAdminDoc[]>{
    return await brandAdmin.getByBrandId(brandId);
}

export async function getByAdminId(adminId:string):Promise<BrandAdminDoc[]>{
    return await brandAdmin.getByAdminId(adminId);
}

/*
export async function getAdminsByBrand(brandId:string):Promise<BrandAdminDoc[]>{
    return await brandAdmin.getAdminsByBrandId(brandId);
}


export async function getBrandIdByAdminId(adminId:string):Promise<string[]>{
    const adminDocs:BrandAdminDoc[] = await brandAdmin.getByAdminId(adminId);
    return adminDocs.map(adminDoc=>(adminDoc.brandId));
}
*/
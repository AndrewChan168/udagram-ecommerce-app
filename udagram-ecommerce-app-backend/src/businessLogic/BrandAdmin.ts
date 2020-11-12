import * as uuid from 'uuid';

import {brandAdmin} from '../resources/BrandAdmin';
import {CreateBrandAdminJson} from '../models/http/CreateBrandAdminJson';
import {BrandAdminDoc} from '../models/doc/BrandAdminDoc';

export async function createAdmin(createBrandAdminJson:CreateBrandAdminJson):Promise<BrandAdminDoc>{
    const adminId = uuid.v4();
    const putDoc:BrandAdminDoc = {
        ...createBrandAdminJson,
        adminId
    }
    await brandAdmin.create(putDoc);
    return putDoc;
}

export async function isAdminOfBrand(adminId:string, brandId:string):Promise<Boolean>{
    const adminDocs:BrandAdminDoc[] = await getAdminsByBrand(brandId);
    const filteredAdminDocs = adminDocs.filter((item, index, array)=>(item.adminId === adminId));
    return filteredAdminDocs.length>=1;
}

export async function getAdminsByBrand(brandId:string):Promise<BrandAdminDoc[]>{
    return await brandAdmin.getAdminsByBrandId(brandId);
}

export async function getAdminByJWTSub(jwtSub:string):Promise<BrandAdminDoc>{
    return await brandAdmin.getByJWTSub(jwtSub)
}

export async function getBrandIdByAdminId(adminId:string):Promise<string>{
    const adminDoc:BrandAdminDoc = await brandAdmin.getByAdminId(adminId);
    return adminDoc.brandId;
}
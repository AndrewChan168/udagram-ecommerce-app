import * as uuid from 'uuid';

import {brand} from '../resources/Brand';
import {BrandDoc} from '../models/doc/BrandDoc';
import {CreateBrandJson} from '../models/http/CreateBrandJson';
import {BrandAdminDoc} from '../models/doc/BrandAdminDoc';
import {getByAdminId} from './BrandAdmin';
import { getAdminByJWTSub } from './Admin';

export async function createBrand(createBrandJson:CreateBrandJson):Promise<BrandDoc>{
    const brandId = uuid.v4()
    const putBrandDoc:BrandDoc = {
        ...createBrandJson,
        brandId
    }

    await brand.create(putBrandDoc);

    return putBrandDoc;
}

export async function getBrandById(brandId:string):Promise<BrandDoc>{
    const brandDoc = await brand.getByBrandId(brandId);
    console.log(`inside businessLogic/Brand/getBrandById(), brandDoc:`, brandDoc);
    return brandDoc;
}

export async function getAllBrands():Promise<BrandDoc[]>{
    return await brand.getAll();
}

export async function updateBrand(brandDoc:BrandDoc):Promise<BrandDoc>{
    return await brand.update(brandDoc);
}

export async function getBrandByAdminId(adminId:string):Promise<BrandDoc[]>{
    const brandAdmins:BrandAdminDoc[] = await getByAdminId(adminId);
    //const brandDocs:BrandDoc[] = await Promise.all(brandIds.map(async (brandId)=>(await getBrandById(brandId))));
    const brandDocs:BrandDoc[] = await Promise.all(brandAdmins.map(async (brandAdmin)=>(await getBrandById(brandAdmin.brandId))));
    return brandDocs;
}

export async function getBrandsByJWTSub(jwtSub:string):Promise<BrandDoc[]>{
    const adminId = (await getAdminByJWTSub(jwtSub)).adminId;
    const brandAdmins:BrandAdminDoc[] = await getByAdminId(adminId);
    //const brandDocs:BrandDoc[] = await Promise.all(brandIds.map(async (brandId)=>(await getBrandById(brandId))));
    const brandDocs:BrandDoc[] = await Promise.all(brandAdmins.map(async (brandAdmin)=>(await getBrandById(brandAdmin.brandId))));
    return brandDocs;
}

export async function patchBrand(brandDoc:BrandDoc):Promise<BrandDoc>{
    return await brand.update(brandDoc);
}
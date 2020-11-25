import * as uuid from 'uuid';

import {brand} from '../resources/Brand';
import {BrandDoc} from '../models/doc/BrandDoc';
import {CreateBrandJson} from '../models/http/CreateBrandJson';
import {getBrandIdByAdminId} from './BrandAdmin';

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
    return brandDoc;
}

export async function getAllBrands():Promise<BrandDoc[]>{
    return await brand.getAll();
}

export async function updateBrand(brandDoc:BrandDoc):Promise<BrandDoc>{
    return await brand.update(brandDoc);
}

export async function getBrandByAdminId(adminId:string):Promise<BrandDoc[]>{
    const brandIds:string[] = await getBrandIdByAdminId(adminId);
    const brandDocs:BrandDoc[] = await Promise.all(brandIds.map(async (brandId)=>(await getBrandById(brandId))));
    //const brandDoc = await getBrandById(brandId);
    return brandDocs;
}
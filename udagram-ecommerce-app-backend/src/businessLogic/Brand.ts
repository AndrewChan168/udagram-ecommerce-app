import * as uuid from 'uuid';

import {brand} from '../resources/Brand';
import {BrandDoc} from '../models/doc/BrandDoc';
import {CreateBrandJson} from '../models/http/CreateBrandJson';

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
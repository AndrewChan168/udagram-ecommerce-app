import * as uuid from 'uuid';

import {admin} from './../resources/Admin';
import {AdminDoc} from './../models/doc/AdminDoc';
import {CreateAdminJson} from './../models/http/CreateAdminJson';

export async function creatAdmin(createAdminJson:CreateAdminJson):Promise<AdminDoc>{
    const adminId = uuid.v4();
    const putAdminDoc = {
        ...createAdminJson,
        adminId
    } as AdminDoc;

    await admin.create(putAdminDoc);

    return putAdminDoc;
}

export async function getAdminByJWTSub(jwtSub:string):Promise<AdminDoc>{
    return await admin.getByJWTSub(jwtSub)
}

export async function getAdminByAdminId(adminId:string):Promise<AdminDoc>{
    return await admin.getByAdminId(adminId)
}
import * as uuid from 'uuid';
import moment from 'moment';

import {CreateItemJson} from '../models/http/CreateItemJson';
import {CreateItemImageJson} from '../models/http/CreateItemImageJson';
import {UpdateItemJson} from '../models/http/UpdateItemJson';
import {ItemDoc} from '../models/doc/ItemDoc';
import {item} from '../resources/Item';
import {getBrandById, getBrandByAdminId} from './Brand';
import {ResponseItemBriefJson,ResponseItemBriefJsons} from '../models/http/ResponseItemBriefJson';
import {ResponseItemImageJson} from '../models/http/ResponseItemImageJson';
import {ResponseCreateItemJson} from '../models/http/ResponseCreateItemJson';
import {ResponseItemDetailJson} from '../models/http/ResponseItemDetailJson';

import {getImageDocByImageId,createItemImageDoc,getImageDocsByItemId} from './ItemImage';
import {getAdminByJWTSub} from './Admin';
import {deleteImageByImageId} from './ItemImage';


const StarsReducer = (accumlator, currentDoc) =>  accumlator + parseInt(currentDoc.star);

export async function createItem(createItemJson:CreateItemJson):Promise<ResponseCreateItemJson>{
    const itemId = uuid.v4();
    //const createItemImageJson:CreateItemImageJson = {itemId,createDatetime:moment().format()};
    //const itemImageDoc:ResponseItemImageJson = await createItemImageDoc(createItemImageJson);
    //console.log(`In businessLogic/createItem() function after createItemImageDoc():`, itemImageDoc);
    const putItemDoc = {
        ...createItemJson,
        comments:[],
        stars:0,
        itemId,
        //windowImageId:itemImageDoc.imageId,
    } as ItemDoc;
    await item.create(putItemDoc);
    const responseCreateItemJson:ResponseCreateItemJson ={
        itemId,
        itemName:putItemDoc.itemName,
        introduction:putItemDoc.introduction,
        brandId:putItemDoc.brandId,
        price:putItemDoc.price,
        //uploadPhotoUrl:itemImageDoc.uploadUrl,
    }
    console.log(`In businessLogic/createItem() function after item.create():`, responseCreateItemJson);
    return responseCreateItemJson;
}

export async function uploadWindowPhotoForItem(itemId:string, imageId:string){
    item.update(itemId, 'windowImageId', imageId)
}

export async function getItemBrief(itemId:string):Promise<ResponseItemBriefJson>{
    const itemDoc = await item.getByItemId(itemId);
    const imageDoc = await getImageDocByImageId(itemDoc.windowImageId);
    var thumbnailUrl = '';
    if(imageDoc.thumbnailUrl){
        thumbnailUrl = imageDoc.thumbnailUrl;
    }

    return {
        itemId:itemId,
        itemName:itemDoc.itemName,
        thumbnailUrl,
        stars: (itemDoc.comments.length===0) ? 0 : itemDoc.comments.reduce(StarsReducer, 0)/itemDoc.comments.length,
        price:itemDoc.price,
    } as ResponseItemBriefJson;
}

export async function getItemDetail(itemId:string):Promise<ResponseItemDetailJson>{
    const itemDoc = await item.getByItemId(itemId);
    const imageDocs = await getImageDocsByItemId(itemId)
    const iteratingImageJson = await Promise.all(imageDocs.map(async (imageDoc)=>({
        imageId:imageDoc.imageId,
        photoUrl:imageDoc.photoUrl,
        thumbnailUrl:imageDoc.thumbnailUrl,
    })));
    const responseItemDetailJson:ResponseItemDetailJson = {
        itemId:itemDoc.itemId,
        itemName:itemDoc.itemName,
        introduction:itemDoc.introduction,
        stars:(itemDoc.comments.length===0) ? 0 : itemDoc.comments.reduce(StarsReducer, 0)/itemDoc.comments.length,
        price:itemDoc.price,
        comments:itemDoc.comments,
        brandId:itemDoc.brandId,
        brandName:(await getBrandById(itemDoc.brandId)).brandName,
        photos:iteratingImageJson
    };

    return responseItemDetailJson;
}

export async function getListOfItemsBrief(brandId:string):Promise<ResponseItemBriefJson[]>{
    const itemDocs:ItemDoc[] = await item.getItemsByBrandId(brandId);
    console.log(`inside businessLogic/Item/getListOfItemsBrief(), itemDocs:`, itemDocs);
    const responseItemBriefJsons = await Promise.all(itemDocs.map(async (itemDoc)=>({
            itemId:itemDoc.itemId,
            itemName:itemDoc.itemName,
            stars:(itemDoc.comments.length===0) ? 0 : itemDoc.comments.reduce(StarsReducer, 0)/itemDoc.comments.length,
            price:itemDoc.price,
            //thumbnailUrl:(await getImageDocByImageId(itemDoc.windowImageId)).thumbnailUrl,
        })
    ));
    console.log(`inside businessLogic/Item/getListOfItemsBrief(), responseItemBriefJsons:`, responseItemBriefJsons);
    return responseItemBriefJsons as ResponseItemBriefJson[];
}


export async function getListOfItemsBriefByJWTSub(jwtSub:string):Promise<ResponseItemBriefJsons[]>{
    console.log(`inside businessLogic/Item/getListOfItemsBriefByJWTSub, jwtSub:`, jwtSub);
    const adminDoc = await getAdminByJWTSub(jwtSub);
    console.log(`inside businessLogic/Item/getListOfItemsBriefByJWTSub, adminDoc:`, adminDoc);
    const brandDocs = await getBrandByAdminId(adminDoc.adminId);
    console.log(`inside businessLogic/Item/getListOfItemsBriefByJWTSub, brandDocs:`, brandDocs);
    const itemBriefJsons = await Promise.all(brandDocs.map(async (brandDoc)=>({
        brand:await getBrandById(brandDoc.brandId),
        items:await getListOfItemsBrief(brandDoc.brandId)
    }))) 
    console.log(`inside businessLogic/Item/getListOfItemsBriefByJWTSub, itemBriefJsons:`, itemBriefJsons)
    return itemBriefJsons.map(itemBriefJson=>({
        brand:{brandId:itemBriefJson.brand.brandId, brandName:itemBriefJson.brand.brandName},
        items:itemBriefJson.items as ResponseItemBriefJson[]
    })) as ResponseItemBriefJsons[]
}


export async function deleteItemDoc(itemId:string){
    await item.delete(itemId);
}

export async function updateItemDoc(updateItemJson:UpdateItemJson):Promise<ResponseItemDetailJson>{
    await item.patchItem(updateItemJson);
    return await getItemDetail(updateItemJson.itemId);
}

export async function updateItemWindowImage(itemId:string, windowImageId:string){
    await item.patchItemWindowImageId(itemId, windowImageId);
    await deleteImageByImageId(windowImageId);
}
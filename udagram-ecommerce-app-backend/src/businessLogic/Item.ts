import * as uuid from 'uuid';

import {CreateItemJson} from '../models/http/CreateItemJson';
import {ItemDoc} from '../models/doc/ItemDoc';
import {item} from '../resources/Item';
import {ResponseItemBriefJson} from '../models/http/ResponseItemBriefJson';
import {getImageDocByImageId} from './ItemImage';

const StarsReducer = (accumlator, currentDoc) =>  accumlator + parseInt(currentDoc.star);

export async function createItem(createItemJson:CreateItemJson):Promise<ItemDoc>{
    const itemId = uuid.v4();
    const putItemDoc = {
        ...createItemJson,
        comments:[],
        stars:0,
        itemId
    } as ItemDoc;
    item.create(putItemDoc);
    return putItemDoc;
}

export async function uploadWindowPhotoForItem(itemId:string, imageId:string){
    /** to be worked */
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
        stars:itemDoc.comments.reduce(StarsReducer, 0)/itemDoc.comments.length,
        price:itemDoc.price,
    } as ResponseItemBriefJson;
}

export async function getListOfItemsBrief(brandId:string):Promise<ResponseItemBriefJson[]>{
    const itemDocs:ItemDoc[] = await item.getItemsByBrandId(brandId);
    const responseItemBriefJsons = await Promise.all(itemDocs.map(async (itemDoc)=>({
            itemId:itemDoc.itemId,
            itemName:itemDoc.itemName,
            stars:itemDoc.comments.reduce(StarsReducer, 0)/itemDoc.comments.length,
            price:itemDoc.price,
            thumbnailUrl:(await getImageDocByImageId(itemDoc.windowImageId)).thumbnailUrl,
        })
    ));
    return responseItemBriefJsons as ResponseItemBriefJson[];

}
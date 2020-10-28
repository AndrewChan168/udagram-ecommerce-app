import * as uuid from 'uuid';

import {itemImage} from '../resources/ItemImage';
import {ImageDoc} from '../models/doc/ImageDoc';
import {CreateItemImageJson} from '../models/http/CreateItemImageJson';
import {ResponseItemImageDoc} from '../models/http/ResponseItemImageJson';

export async function createItemImageDoc(createItemImageJson:CreateItemImageJson):Promise<ResponseItemImageDoc>{
    const imageId = uuid.v4();
    const putItemImageDoc:ImageDoc = {
        ...createItemImageJson,
        imageId,
        photoUrl:`https://${itemImage.getImageBucketName()}.s3.amazonaws.com/${imageId}`,
        thumbnailUrl:`https://${itemImage.getThumbnailBucketName()}.s3.amazonaws.com/${imageId}`
    }

    const uploadUrl = await itemImage.create(putItemImageDoc);
    const responseItemImageDoc:ResponseItemImageDoc = {
        ...putItemImageDoc,
        uploadUrl
    }
    return responseItemImageDoc as ResponseItemImageDoc;
}

export async function getImageDocByImageId(imageId:string):Promise<ImageDoc>{
    return await itemImage.getDocByImageId(imageId);

}

export async function getImageDocsByItemId(itemId:string):Promise<ImageDoc[]>{
    return await itemImage.getDocsByItemId(itemId);
}

export async function deleteImageByImageId(imageId:string){
    await itemImage.delete(imageId);
}
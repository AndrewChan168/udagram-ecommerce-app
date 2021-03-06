import * as uuid from 'uuid';
import Jimp from 'jimp';

import {itemImage} from '../resources/ItemImage';
import {ImageDoc} from '../models/doc/ImageDoc';
import {CreateItemImageJson} from '../models/http/CreateItemImageJson';
import {ResponseItemImageJson} from '../models/http/ResponseItemImageJson';

export async function createItemImageDoc(createItemImageJson:CreateItemImageJson):Promise<ResponseItemImageJson>{
    console.log(`inside businessLogic/ItemImage/createItemImageDoc(), createItemImageJson:`, createItemImageJson);
    const imageId = uuid.v4();
    const putItemImageDoc:ImageDoc = {
        ...createItemImageJson,
        imageId,
        photoUrl:`https://${itemImage.getImageBucketName()}.s3.amazonaws.com/${imageId}`,
        thumbnailUrl:`https://${itemImage.getThumbnailBucketName()}.s3.amazonaws.com/${imageId}`
    }
    console.log(`inside businessLogic/ItemImage/createItemImageDoc(), putItemImageDoc:`, putItemImageDoc);
    const uploadUrl = await itemImage.create(putItemImageDoc);
    const responseItemImageDoc:ResponseItemImageJson = {
        ...putItemImageDoc,
        uploadUrl
    }
    return responseItemImageDoc as ResponseItemImageJson;
}

export async function getImageDocByImageId(imageId:string):Promise<ImageDoc>{
    const imageDoc = await itemImage.getDocByImageId(imageId);
    console.log(`inside businessLogic/ItemImage/getImageDocByImageId(), imageDoc:`, imageDoc);
    return imageDoc;
}

export async function getImageDocsByItemId(itemId:string):Promise<ImageDoc[]>{
    return await itemImage.getDocsByItemId(itemId);
}

export async function deleteImageByImageId(imageId:string){
    await itemImage.delete(imageId);
}

export async function createThumbnail(imageId:string){
    const image:Jimp = await itemImage.getImage(imageId);
    image.resize(75, Jimp.AUTO);
    const convertedBuffer = await image.getBufferAsync(Jimp.AUTO);
    await itemImage.createResizedImage(imageId, convertedBuffer);
}
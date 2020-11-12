import {CommentDoc} from '../doc/ItemDoc'

export interface IteratingImageJson{
    imageId:string,
    photoUrl:string,
    thumbnailUrl:string,
}

export interface ResponseItemDetailJson{
    itemId:string,
    itemName:string,
    stars:number,
    price:number,
    introduction: string,
    brandId: string,
    brandName: string,
    comments:CommentDoc[],
    photos:IteratingImageJson[]
}
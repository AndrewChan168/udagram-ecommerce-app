export interface CommentDoc {
    personId: string,
    personName: string,
    star: number,
    comment: string,
}


export interface ItemDoc {
    itemId: string,
    itemName: string,
    introduction: string,
    brandId: string,
    comments:CommentDoc[],
    price:number,
    windowImageId?:string,
}
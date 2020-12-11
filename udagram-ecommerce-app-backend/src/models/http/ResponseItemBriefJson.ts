export interface ResponseItemBriefJson{
    itemId:string,
    itemName:string,
    //thumbnailUrl:string,
    stars:number,
    price:number,
}



export interface ResponseItemBriefJsons{
    brand:{
        brandId: string,
        brandName: string,
    },
    items:ResponseItemBriefJson[]
}
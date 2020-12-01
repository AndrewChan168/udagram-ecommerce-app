export interface CartItemDoc {
    itemId:string,
    itemName:string,
    qty:number,
}

export interface MemberDoc {
    memberId:string,
    memberName:string,
    email:string,
    photoNo:number,
    oauth:string,
    cart:CartItemDoc[]
}
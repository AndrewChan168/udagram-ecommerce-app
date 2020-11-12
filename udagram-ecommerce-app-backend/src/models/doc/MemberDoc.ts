export interface CartItemDoc {
    itemId:string,
    itemName:string,
    qty:number,
    unitPrice?:number,
    totalPrice?:number,
}

export interface MemberDoc {
    memberId:string,
    memberName:string,
    email:string,
    photoNo:number,
    oauth:string,
    cart:CartItemDoc[]
}
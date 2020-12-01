interface InvoiceItemDoc {
    itemId:string,
    itemName:string,
    qty:number,
    unitPrice:number,
}

export interface InvoiceDoc {
    invoiceId: string,
    memberId:string,
    items:InvoiceItemDoc[],
    totalPrice:number,
}
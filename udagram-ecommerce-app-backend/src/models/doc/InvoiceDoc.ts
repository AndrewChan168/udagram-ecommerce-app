interface InvoiceItemDoc {
    itemId:string,
    itemName:string,
    qty:number,
    unitPrice:number,
}

export interface InvoiceDoc {
    invoiceId: string,
    personId:string,
    items:InvoiceItemDoc[],
    totalPrice:number,
}
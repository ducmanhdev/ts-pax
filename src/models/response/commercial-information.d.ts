type CommercialInformationParams = {
    poNumber: string;
    customerCode: string;
    taxExempt: string;
    taxExemptID: string;
    merchantTaxID: string;
    destinationZipCode: string;
    productDescription: string;
};
export default class CommercialInformation {
    poNumber: string;
    customerCode: string;
    taxExempt: string;
    taxExemptID: string;
    merchantTaxID: string;
    destinationZipCode: string;
    productDescription: string;
    constructor({ poNumber, customerCode, taxExempt, taxExemptID, merchantTaxID, destinationZipCode, productDescription, }: CommercialInformationParams);
    static fromString(res: string): CommercialInformation;
    toJson(): {
        po_number: string;
        customer_code: string;
        tax_exempt: string;
        tax_exempt_id: string;
        merchant_tax_id: string;
        destination_zip_code: string;
        product_description: string;
    };
}
export {};
//# sourceMappingURL=commercial-information.d.ts.map
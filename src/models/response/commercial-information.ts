type CommercialInformationParams = {
    poNumber: string;
    customerCode: string;
    taxExempt: string;
    taxExemptID: string;
    merchantTaxID: string;
    destinationZipCode: string;
    productDescription: string;
}

export default class CommercialInformation {
    poNumber: string;
    customerCode: string;
    taxExempt: string;
    taxExemptID: string;
    merchantTaxID: string;
    destinationZipCode: string;
    productDescription: string;

    constructor({
                    poNumber,
                    customerCode,
                    taxExempt,
                    taxExemptID,
                    merchantTaxID,
                    destinationZipCode,
                    productDescription,
                }: CommercialInformationParams) {
        this.poNumber = poNumber;
        this.customerCode = customerCode;
        this.taxExempt = taxExempt;
        this.taxExemptID = taxExemptID;
        this.merchantTaxID = merchantTaxID;
        this.destinationZipCode = destinationZipCode;
        this.productDescription = productDescription;
    }

    static fromList(fields: any[]) {
        return new CommercialInformation({
            poNumber: fields[0],
            customerCode: fields[0],
            taxExempt: fields[0],
            taxExemptID: fields[0],
            merchantTaxID: fields[0],
            destinationZipCode: fields[0],
            productDescription: fields[0],
        });
    }

    static fromString(res: string) {
        const fields = res.split(String.fromCharCode(31));
        return CommercialInformation.fromList(fields);
    }

    toJson() {
        return {
            'po_number': this.poNumber,
            'customer_code': this.customerCode,
            'tax_exempt': this.taxExempt,
            'tax_exempt_id': this.taxExemptID,
            'merchant_tax_id': this.merchantTaxID,
            'destination_zip_code': this.destinationZipCode,
            'product_description': this.productDescription,
        }
    }
}
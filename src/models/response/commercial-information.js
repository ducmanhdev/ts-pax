"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommercialInformation {
    constructor({ poNumber, customerCode, taxExempt, taxExemptID, merchantTaxID, destinationZipCode, productDescription, }) {
        this.poNumber = poNumber;
        this.customerCode = customerCode;
        this.taxExempt = taxExempt;
        this.taxExemptID = taxExemptID;
        this.merchantTaxID = merchantTaxID;
        this.destinationZipCode = destinationZipCode;
        this.productDescription = productDescription;
    }
    static fromString(res) {
        const fields = res.split(String.fromCharCode(31));
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
    toJson() {
        return {
            'po_number': this.poNumber,
            'customer_code': this.customerCode,
            'tax_exempt': this.taxExempt,
            'tax_exempt_id': this.taxExemptID,
            'merchant_tax_id': this.merchantTaxID,
            'destination_zip_code': this.destinationZipCode,
            'product_description': this.productDescription,
        };
    }
}
exports.default = CommercialInformation;

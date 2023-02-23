"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TrackInfo {
    constructor({ referenceNumber = '1', invoiceNumber = '', authCode = '', transactionNumber = '', timeStamp = '', ecrTransId = '' }) {
        this.referenceNumber = referenceNumber;
        this.invoiceNumber = invoiceNumber;
        this.authCode = authCode;
        this.transactionNumber = transactionNumber;
        this.timeStamp = timeStamp;
        this.ecrTransId = ecrTransId;
    }
    toListData() {
        return [
            this.referenceNumber,
            this.invoiceNumber,
            this.authCode,
            this.transactionNumber,
            this.timeStamp,
            this.ecrTransId
        ];
    }
}
exports.default = TrackInfo;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReportRequest {
    constructor({ edcType = '', cardType = '', paymentType = '', recordNum = '', refNum = '', authCode = '', ecrRefNum = '' }) {
        this.edcType = edcType;
        this.cardType = cardType;
        this.paymentType = paymentType;
        this.recordNum = recordNum;
        this.refNum = refNum;
        this.authCode = authCode;
        this.ecrRefNum = ecrRefNum;
    }
    toListData() {
        return [
            this.edcType,
            this.cardType,
            this.paymentType,
            this.recordNum,
            this.refNum,
            this.authCode,
            this.ecrRefNum
        ];
    }
}
exports.default = ReportRequest;

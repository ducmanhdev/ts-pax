type ReportRequestParams = {
    edcType?: string;
    cardType?: string;
    paymentType?: string;
    recordNum?: string;
    refNum?: string;
    authCode?: string;
    ecrRefNum?: string;
}

export default class ReportRequest {
    edcType: string;
    cardType: string;
    paymentType: string;
    recordNum: string;
    refNum: string;
    authCode: string;
    ecrRefNum: string;

    constructor({
                    edcType = '',
                    cardType = '',
                    paymentType = '',
                    recordNum = '',
                    refNum = '',
                    authCode = '',
                    ecrRefNum = ''
                }: ReportRequestParams) {
        this.edcType = edcType;
        this.cardType = cardType;
        this.paymentType = paymentType;
        this.recordNum = recordNum;
        this.refNum = refNum;
        this.authCode = authCode;
        this.ecrRefNum = ecrRefNum
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
type ReportRequestParams = {
    edcType?: string;
    cardType?: string;
    paymentType?: string;
    recordNum?: string;
    refNum?: string;
    authCode?: string;
    ecrRefNum?: string;
};
export default class ReportRequest {
    edcType: string;
    cardType: string;
    paymentType: string;
    recordNum: string;
    refNum: string;
    authCode: string;
    ecrRefNum: string;
    constructor({ edcType, cardType, paymentType, recordNum, refNum, authCode, ecrRefNum }: ReportRequestParams);
    toListData(): string[];
}
export {};
//# sourceMappingURL=report-request.d.ts.map
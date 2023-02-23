type TrackInfoParams = {
    referenceNumber?: string;
    invoiceNumber?: string;
    authCode?: string;
    transactionNumber?: string;
    timeStamp?: string;
    ecrTransId?: string;
};
export default class TrackInfo {
    referenceNumber: string;
    invoiceNumber: string;
    authCode: string;
    transactionNumber: string;
    timeStamp: string;
    ecrTransId: string;
    constructor({ referenceNumber, invoiceNumber, authCode, transactionNumber, timeStamp, ecrTransId }: TrackInfoParams);
    toListData(): string[];
}
export {};
//# sourceMappingURL=track-info.d.ts.map
type TrackInfoParams = {
    referenceNumber?: string;
    invoiceNumber?: string;
    authCode?: string;
    transactionNumber?: string;
    timeStamp?: string;
    ecrTransId?: string;
}

export default class TrackInfo {
    referenceNumber: string;
    invoiceNumber: string;
    authCode: string;
    transactionNumber: string;
    timeStamp: string;
    ecrTransId: string;

    constructor({
                    referenceNumber = '1',
                    invoiceNumber = '',
                    authCode = '',
                    transactionNumber = '',
                    timeStamp = '',
                    ecrTransId = ''
                }: TrackInfoParams) {
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
        ]
    }
}
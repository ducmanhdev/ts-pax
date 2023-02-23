type TraceInformationParams = {
    transactionNumber: string;
    referenceNumber: string;
    timeStamp: string;
}

export default class TraceInformation {
    transactionNumber: string;
    referenceNumber: string;
    timeStamp: string;

    constructor({
                    transactionNumber,
                    referenceNumber,
                    timeStamp,
                }: TraceInformationParams) {
        this.transactionNumber = transactionNumber;
        this.referenceNumber = referenceNumber;
        this.timeStamp = timeStamp;
    }

    static fromString(res: string) {
        const fields = res.split(String.fromCharCode(31));
        return new TraceInformation({
            transactionNumber: fields[0]!,
            referenceNumber: fields[1]!,
            timeStamp: fields[2]!,
        });
    }

    toJson() {
        return {
            'transaction_number': this.transactionNumber,
            'reference_number': this.referenceNumber,
            'time_stamp': this.timeStamp
        }
    }
}
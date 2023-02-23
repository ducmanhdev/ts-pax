type TraceInformationParams = {
    transactionNumber: string;
    referenceNumber: string;
    timeStamp: string;
};
export default class TraceInformation {
    transactionNumber: string;
    referenceNumber: string;
    timeStamp: string;
    constructor({ transactionNumber, referenceNumber, timeStamp, }: TraceInformationParams);
    static fromString(res: string): TraceInformation;
    toJson(): {
        transaction_number: string;
        reference_number: string;
        time_stamp: string;
    };
}
export {};
//# sourceMappingURL=trace-information.d.ts.map
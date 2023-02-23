import PaxBatchResponse from "./pax-batch-response";
import PaxPaymentResponse from "./pax-payment-response";
type PaxResponseParams = {
    status: string;
    command: string;
    version: string;
    responseCode: string;
    responseMessage: string;
};
export default class PaxResponse {
    static COMMAND_TYPE_PAYMENT: string;
    static COMMAND_TYPE_BATCH: string;
    status: string;
    command: string;
    version: string;
    responseCode: string;
    responseMessage: string;
    amount: number | undefined;
    paxPaymentResponse: PaxPaymentResponse | undefined;
    paxBatchResponse: PaxBatchResponse | undefined;
    constructor({ status, command, version, responseCode, responseMessage }: PaxResponseParams);
    static fromString(res: string): PaxResponse | null;
    extraData(): {
        hostInformation: import("./host-information").default;
        hostInformationRaw: string;
        transactionType: string;
        amountInformationRaw: string;
        amountInformation: import("./amount-information").default;
        accountInformation: import("./account-information").default;
        accountInformationRaw: string;
        traceInformationRaw: string;
        traceInformation: import("./trace-information").default;
        aVSinformationRaw: string;
        commercialInformationRaw: string;
        motoEcommerceRaw: string;
        additionalInformationRaw: string;
    } | {
        messageRaw: string;
        batchCount: import("./batch-count").default;
        batchAmount: import("./batch-amount").default;
        timestamp: string;
        mid: string;
        tid: string;
    } | null;
    toJson(): {
        status: string;
        command: string;
        version: string;
        response_code: string;
        response_message: string;
        amount: number | undefined;
        extra_data: {
            hostInformation: import("./host-information").default;
            hostInformationRaw: string;
            transactionType: string;
            amountInformationRaw: string;
            amountInformation: import("./amount-information").default;
            accountInformation: import("./account-information").default;
            accountInformationRaw: string;
            traceInformationRaw: string;
            traceInformation: import("./trace-information").default;
            aVSinformationRaw: string;
            commercialInformationRaw: string;
            motoEcommerceRaw: string;
            additionalInformationRaw: string;
        } | {
            messageRaw: string;
            batchCount: import("./batch-count").default;
            batchAmount: import("./batch-amount").default;
            timestamp: string;
            mid: string;
            tid: string;
        } | null;
    };
}
export {};
//# sourceMappingURL=pax-response.d.ts.map
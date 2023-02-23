import HostInformation from "./host-information";
import TraceInformation from "./trace-information";
import AmountInformation from "./amount-information";
import AccountInformation from "./account-information";
type PaxPaymentResponseParams = {
    hostInformationRaw: string;
    hostInformation: HostInformation;
    transactionType: string;
    amountInformationRaw: string;
    accountInformationRaw: string;
    amountInformation: AmountInformation;
    accountInformation: AccountInformation;
    traceInformationRaw: string;
    traceInformation: TraceInformation;
    aVSinformationRaw: string;
    commercialInformationRaw: string;
    motoEcommerceRaw: string;
    additionalInformationRaw: string;
};
export default class PaxPaymentResponse {
    hostInformationRaw: string;
    hostInformation: HostInformation;
    transactionType: string;
    amountInformationRaw: string;
    accountInformationRaw: string;
    amountInformation: AmountInformation;
    accountInformation: AccountInformation;
    traceInformationRaw: string;
    traceInformation: TraceInformation;
    aVSinformationRaw: string;
    commercialInformationRaw: string;
    motoEcommerceRaw: string;
    additionalInformationRaw: string;
    constructor({ hostInformationRaw, hostInformation, transactionType, amountInformationRaw, accountInformationRaw, amountInformation, accountInformation, traceInformationRaw, traceInformation, aVSinformationRaw, commercialInformationRaw, motoEcommerceRaw, additionalInformationRaw, }: PaxPaymentResponseParams);
    static fromList(data: string[]): PaxPaymentResponse;
    toJson(): {
        hostInformation: HostInformation;
        hostInformationRaw: string;
        transactionType: string;
        amountInformationRaw: string;
        amountInformation: AmountInformation;
        accountInformation: AccountInformation;
        accountInformationRaw: string;
        traceInformationRaw: string;
        traceInformation: TraceInformation;
        aVSinformationRaw: string;
        commercialInformationRaw: string;
        motoEcommerceRaw: string;
        additionalInformationRaw: string;
    };
}
export {};
//# sourceMappingURL=pax-payment-response.d.ts.map
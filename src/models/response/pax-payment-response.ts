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
}

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

    constructor({
                    hostInformationRaw,
                    hostInformation,
                    transactionType,
                    amountInformationRaw,
                    accountInformationRaw,
                    amountInformation,
                    accountInformation,
                    traceInformationRaw,
                    traceInformation,
                    aVSinformationRaw,
                    commercialInformationRaw,
                    motoEcommerceRaw,
                    additionalInformationRaw,
                }: PaxPaymentResponseParams) {
        this.hostInformation = hostInformation;
        this.hostInformationRaw = hostInformationRaw;
        this.transactionType = transactionType;
        this.amountInformationRaw = amountInformationRaw;
        this.amountInformation = amountInformation;
        this.accountInformationRaw = accountInformationRaw;
        this.accountInformation = accountInformation;
        this.traceInformationRaw = traceInformationRaw;
        this.traceInformation = traceInformation;
        this.aVSinformationRaw = aVSinformationRaw;
        this.commercialInformationRaw = commercialInformationRaw;
        this.motoEcommerceRaw = motoEcommerceRaw;
        this.additionalInformationRaw = additionalInformationRaw;
    }

    static fromList(data: any[]) {
        return new PaxPaymentResponse({
            hostInformationRaw: data[5]!,
            hostInformation: HostInformation.fromString(data[5]!),
            transactionType: data[6]!,
            amountInformationRaw: data[7]!,
            amountInformation: AmountInformation.fromString(data[7]!),
            accountInformationRaw: data[8]!,
            accountInformation: AccountInformation.fromString(data[8]!),
            traceInformationRaw: data[9]!,
            traceInformation: TraceInformation.fromList(data[9]!),
            aVSinformationRaw: data[10]!,
            commercialInformationRaw: data[11]!,
            motoEcommerceRaw: data[12]!,
            additionalInformationRaw: data[13]!,
        });
    }

    toJson() {
        return {
            'hostInformation': this.hostInformation,
            'hostInformationRaw': this.hostInformationRaw,
            'transactionType': this.transactionType,
            'amountInformationRaw': this.amountInformationRaw,
            'amountInformation': this.amountInformation,
            'accountInformation': this.accountInformation,
            'accountInformationRaw': this.accountInformationRaw,
            'traceInformationRaw': this.traceInformationRaw,
            'traceInformation': this.traceInformation,
            'aVSinformationRaw': this.aVSinformationRaw,
            'commercialInformationRaw': this.commercialInformationRaw,
            'motoEcommerceRaw': this.motoEcommerceRaw,
            'additionalInformationRaw': this.additionalInformationRaw
        }
    }
}
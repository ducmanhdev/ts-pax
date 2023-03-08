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

    static fromList(fields: any[]) {
        return new PaxPaymentResponse({
            hostInformationRaw: fields[6],
            hostInformation: HostInformation.fromList(fields[6]),
            transactionType: fields[7],
            amountInformationRaw: fields[8],
            amountInformation: AmountInformation.fromList(fields[8]),
            accountInformationRaw: fields[9],
            accountInformation: AccountInformation.fromList(fields[9]),
            traceInformationRaw: fields[10],
            traceInformation: TraceInformation.fromList(fields[10]),
            aVSinformationRaw: fields[11],
            commercialInformationRaw: fields[12],
            motoEcommerceRaw: fields[13],
            additionalInformationRaw: fields[14],
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
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const host_information_1 = __importDefault(require("./host-information"));
const trace_information_1 = __importDefault(require("./trace-information"));
const amount_information_1 = __importDefault(require("./amount-information"));
const account_information_1 = __importDefault(require("./account-information"));
class PaxPaymentResponse {
    constructor({ hostInformationRaw, hostInformation, transactionType, amountInformationRaw, accountInformationRaw, amountInformation, accountInformation, traceInformationRaw, traceInformation, aVSinformationRaw, commercialInformationRaw, motoEcommerceRaw, additionalInformationRaw, }) {
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
    static fromList(data) {
        /*
            hostInformationRaw: fields[5] as String,
            transactionType: fields[6] as String,
            amountInformationRaw: fields[7] as String,
            accountInformationRaw: fields[8] as String,
            traceInformationRaw: fields[9] as String,
            traceInformation: TraceInformation.fromString(fields[9] as String),
            aVSinformationRaw: fields[10] as String,
            commercialInformationRaw: fields[11] as String,
            motoEcommerceRaw: fields[12] as String,
            additionalInformationRaw: fields[13] as String,
        */
        return new PaxPaymentResponse({
            hostInformationRaw: data[5],
            hostInformation: host_information_1.default.fromString(data[5]),
            transactionType: data[6],
            amountInformationRaw: data[7],
            amountInformation: amount_information_1.default.fromString(data[7]),
            accountInformationRaw: data[8],
            accountInformation: account_information_1.default.fromString(data[8]),
            traceInformationRaw: data[9],
            traceInformation: trace_information_1.default.fromString(data[9]),
            aVSinformationRaw: data[10],
            commercialInformationRaw: data[11],
            motoEcommerceRaw: data[12],
            additionalInformationRaw: data[13],
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
        };
    }
}
exports.default = PaxPaymentResponse;

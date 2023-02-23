"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_information_1 = __importDefault(require("./account-information"));
const amount_information_1 = __importDefault(require("./amount-information"));
const host_information_1 = __importDefault(require("./host-information"));
const trace_information_1 = __importDefault(require("./trace-information"));
class PaxLocalDetailReport {
    constructor({ totalRecord, recordNumber, hostInformationRaw, hostInformation, edcType, paymentType, amountInformationRaw, amountInformation, accountInformationRaw, accountInformation, traceInformationRaw, traceInformation, additionalInformationRaw, }) {
        this.totalRecord = totalRecord;
        this.recordNumber = recordNumber;
        this.hostInformationRaw = hostInformationRaw;
        this.hostInformation = hostInformation;
        this.edcType = edcType;
        this.paymentType = paymentType;
        this.amountInformationRaw = amountInformationRaw;
        this.amountInformation = amountInformation;
        this.accountInformationRaw = accountInformationRaw;
        this.accountInformation = accountInformation;
        this.traceInformationRaw = traceInformationRaw;
        this.traceInformation = traceInformation;
        this.additionalInformationRaw = additionalInformationRaw;
    }
    static fromList(data) {
        //0B011.40000000OKSUCCESS14=0=0=0=0=0=0-2601=0=0=0=0=0=020201118205829074719626549662
        // [0, B01, 1.40, 000000, OK, SUCCESS1, 1=0=0=0=0=0=0, 4320=0=0=0=0=0=0, 20201118211603, 07471962, 6549662, ]
        //print(data);
        return new PaxLocalDetailReport({
            totalRecord: data[5],
            recordNumber: data[6],
            hostInformationRaw: data[7],
            hostInformation: host_information_1.default.fromString(data[7]),
            edcType: data[8],
            paymentType: data[9],
            amountInformationRaw: data[11],
            amountInformation: amount_information_1.default.fromString(data[11]),
            accountInformationRaw: data[12],
            accountInformation: account_information_1.default.fromString(data[12]),
            traceInformationRaw: data[13],
            traceInformation: trace_information_1.default.fromString(data[13]),
            additionalInformationRaw: data[17]
        });
    }
    toJson() {
        return {
            'totalRecord': this.totalRecord,
            'recordNumber': this.recordNumber,
            'hostInformationRaw': this.hostInformationRaw,
            'hostInformation': this.hostInformation,
            'edcType': this.edcType,
            'paymentType': this.paymentType,
            'amountInformationRaw': this.amountInformationRaw,
            'amountInformation': this.amountInformation,
            'accountInformationRaw': this.accountInformationRaw,
            'accountInformation': this.accountInformation,
            'traceInformationRaw': this.traceInformationRaw,
            'traceInformation': this.traceInformation,
            'additionalInformationRaw': this.additionalInformationRaw
        };
    }
}
class PaxReportResponse {
    constructor({ status, command, version, responseCode, responseMessage, }) {
        this.status = status;
        this.command = command;
        this.version = version;
        this.responseCode = responseCode;
        this.responseMessage = responseMessage;
    }
    static fromString(res) {
        const fields = res.split(String.fromCharCode(28));
        if (fields.length >= 5) {
            const status = fields[0];
            const command = fields[1];
            const version = fields[2];
            const responseCode = fields[3];
            const responseMessage = fields[4];
            const result = new PaxReportResponse({
                status: status,
                command: command,
                version: version,
                responseCode: responseCode,
                responseMessage: responseMessage,
            });
            if (fields.length >= 14 && command === PaxReportResponse.COMMAND_TYPE_REPORT_LOCAL_DETAIL_RESPONSE) {
                // local pax detail
                result.paxLocalDetailReport = PaxLocalDetailReport.fromList(fields);
            }
            // COMMAND PAX BATCH
            return result;
        }
        return null;
    }
    extraData() {
        if (this.command === PaxReportResponse.COMMAND_TYPE_REPORT_LOCAL_DETAIL_RESPONSE &&
            this.paxLocalDetailReport != null) {
            return this.paxLocalDetailReport.toJson();
        }
        return null;
    }
    toJson() {
        return {
            'status': this.status,
            'command': this.command,
            'version': this.version,
            'response_code': this.responseCode,
            'response_message': this.responseMessage,
            'extra_data': this.extraData(),
        };
    }
}
exports.default = PaxReportResponse;
PaxReportResponse.COMMAND_TYPE_REPORT_LOCAL_DETAIL_RESPONSE = "R03";

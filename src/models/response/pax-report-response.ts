import AccountInformation from "./account-information";
import AmountInformation from "./amount-information";
import HostInformation from "./host-information";
import TraceInformation from "./trace-information";
import {hexToString, stringToHex} from "../../utils";

type PaxLocalDetailReportParams = {
    totalRecord: string;
    recordNumber: string;
    hostInformationRaw: string;
    hostInformation: HostInformation;
    edcType: string;
    paymentType: string;
    amountInformationRaw: string;
    amountInformation: AmountInformation;
    accountInformationRaw: string;
    accountInformation: AccountInformation;
    traceInformationRaw: string;
    traceInformation: TraceInformation;
    additionalInformationRaw: string;
}

class PaxLocalDetailReport {
    totalRecord: string; //5
    recordNumber: string; //6
    hostInformationRaw: string; //7
    hostInformation: HostInformation; //7
    edcType: string; //8
    paymentType: string; //9
    // unknown1: string; //10
    amountInformationRaw: string; //11
    amountInformation: AmountInformation; //11
    accountInformationRaw: string; // 12
    accountInformation: AccountInformation; //12
    traceInformationRaw: string; //13
    traceInformation: TraceInformation; //13
    // unknown2: string; //14
    // unknown3: string; //15
    // unknown4: string; //16
    additionalInformationRaw: string; //17

    constructor({
                    totalRecord,
                    recordNumber,
                    hostInformationRaw,
                    hostInformation,
                    edcType,
                    paymentType,
                    amountInformationRaw,
                    amountInformation,
                    accountInformationRaw,
                    accountInformation,
                    traceInformationRaw,
                    traceInformation,
                    additionalInformationRaw,
                }: PaxLocalDetailReportParams) {
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

    static fromList(data: any[]) {
        return new PaxLocalDetailReport({
            totalRecord: data[5]!,
            recordNumber: data[6]!,
            hostInformationRaw: data[7]!,
            hostInformation: HostInformation.fromString(data[7]!),
            edcType: data[8]!,
            paymentType: data[9]!,
            amountInformationRaw: data[11]!,
            amountInformation: AmountInformation.fromString(data[11]!),
            accountInformationRaw: data[12]!,
            accountInformation: AccountInformation.fromList(data[12]!),
            traceInformationRaw: data[13]!,
            traceInformation: TraceInformation.fromList(data[13]!),
            additionalInformationRaw: data[17]!
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
        }
    }
}

type PaxReportResponseParams = {
    status: string;
    command: string;
    version: string;
    responseCode: string;
    responseMessage: string;
}

export default class PaxReportResponse {
    static COMMAND_TYPE_REPORT_LOCAL_DETAIL_RESPONSE = "R03";

    status: string;
    command: string;
    version: string;
    responseCode: string;
    responseMessage: string;
    paxLocalDetailReport: PaxLocalDetailReport | undefined;

    constructor({
                    status,
                    command,
                    version,
                    responseCode,
                    responseMessage,
                }: PaxReportResponseParams) {
        this.status = status;
        this.command = command;
        this.version = version;
        this.responseCode = responseCode;
        this.responseMessage = responseMessage;
    }

    static fromString(res: string) {
        const len = stringToHex(res).indexOf("03");
        const hex = stringToHex(res).slice(0, len).split(/02|1c/);
        const fields = hex.map((item: any) => {
            if (item.indexOf("1f") > 0) {
                const subHex = item.split("1f");
                return subHex.map((subItem: any) => hexToString(subItem));
            }
            return hexToString(item);
        });
        console.log({rawResponse: res});
        console.log({len});
        console.log({hex});
        console.log({fields});
        if (fields.length >= 5) {
            const status = fields[1]!;
            const command = fields[2]!;
            const version = fields[3]!;
            const responseCode = fields[4]!;
            const responseMessage = fields[5]!;
            const result = new PaxReportResponse({
                status: status,
                command: command,
                version: version,
                responseCode: responseCode,
                responseMessage: responseMessage,
            });
            if (fields.length >= 14 && command === PaxReportResponse.COMMAND_TYPE_REPORT_LOCAL_DETAIL_RESPONSE) {
                result.paxLocalDetailReport = PaxLocalDetailReport.fromList(fields);
            }
            console.log({'parseResponse': result})
            return result;
        }
        return null;
    }

    extraData() {
        if (
            this.command === PaxReportResponse.COMMAND_TYPE_REPORT_LOCAL_DETAIL_RESPONSE &&
            this.paxLocalDetailReport != null
        ) {
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
        }
    }
}


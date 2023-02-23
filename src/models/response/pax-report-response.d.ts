import AccountInformation from "./account-information";
import AmountInformation from "./amount-information";
import HostInformation from "./host-information";
import TraceInformation from "./trace-information";
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
};
declare class PaxLocalDetailReport {
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
    constructor({ totalRecord, recordNumber, hostInformationRaw, hostInformation, edcType, paymentType, amountInformationRaw, amountInformation, accountInformationRaw, accountInformation, traceInformationRaw, traceInformation, additionalInformationRaw, }: PaxLocalDetailReportParams);
    static fromList(data: string[]): PaxLocalDetailReport;
    toJson(): {
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
    };
}
type PaxReportResponseParams = {
    status: string;
    command: string;
    version: string;
    responseCode: string;
    responseMessage: string;
};
export default class PaxReportResponse {
    static COMMAND_TYPE_REPORT_LOCAL_DETAIL_RESPONSE: string;
    status: string;
    command: string;
    version: string;
    responseCode: string;
    responseMessage: string;
    paxLocalDetailReport: PaxLocalDetailReport | undefined;
    constructor({ status, command, version, responseCode, responseMessage, }: PaxReportResponseParams);
    static fromString(res: string): PaxReportResponse | null;
    extraData(): {
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
    } | null;
    toJson(): {
        status: string;
        command: string;
        version: string;
        response_code: string;
        response_message: string;
        extra_data: {
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
        } | null;
    };
}
export {};
//# sourceMappingURL=pax-report-response.d.ts.map
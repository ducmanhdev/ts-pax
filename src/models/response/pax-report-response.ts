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
    amountInformationRaw: string; //12
    amountInformation: AmountInformation; //12
    accountInformationRaw: string; // 13
    accountInformation: AccountInformation; //13
    traceInformationRaw: string; //14
    traceInformation: TraceInformation; //14
    // unknown2: string; //14
    // unknown3: string; //15
    // unknown4: string; //16
    additionalInformationRaw: string; //18

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
            amountInformationRaw: data[12]!,
            amountInformation: AmountInformation.fromList(data[12]!),
            accountInformationRaw: data[13]!,
            accountInformation: AccountInformation.fromList(data[13]!),
            traceInformationRaw: data[14]!,
            traceInformation: TraceInformation.fromList(data[14]!),
            additionalInformationRaw: data[18]!
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

type PaxLocalTotalReportParams = {
    creditSaleCount: string;
    creditSaleAmount: string;
    creditForcedCount: string;
    creditForcedAmount: string;
    creditReturnCount: string;
    creditReturnAmount: string;
    creditAuthCount: string;
    creditAuthAmount: string;
    creditPostAuthCount: string;
    creditPostAuthAmount: string;
    debitSaleCount: string;
    debitSaleAmount: string;
    debitReturnCount: string;
    debitReturnAmount: string;
    eBTSaleCount: string;
    eBTSaleAmount: string;
    eBTReturnCount: string;
    eBTReturnAmount: string;
    eBTWithdrawalCount: string;
    eBTWithdrawalAmount: string;
    giftSaleCount: string;
    giftSaleAmount: string;
    giftAuthCount: string;
    giftAuthAmount: string;
    giftPostAuthCount: string;
    giftPostAuthAmount: string;
    giftActivateCount: string;
    giftActivateAmount: string;
    giftIssueCount: string;
    giftIssueAmount: string;
    giftReloadCount: string;
    giftReloadAmount: string;
    giftReturnCount: string;
    giftReturnAmount: string;
    giftForcedCount: string;
    giftForcedAmount: string;
    giftCashoutCount: string;
    giftCashoutAmount: string;
    giftDeactivateCount: string;
    giftDeactivateAmount: string;
    giftAdjustCount: string;
    giftAdjustAmount: string;
    loyaltyRedeemCount: string;
    loyaltyRedeemAmount: string;
    loyaltyIssueCount: string;
    loyaltyIssueAmount: string;
    loyaltyReloadCount: string;
    loyaltyReloadAmount: string;
    loyaltyReturnCount: string;
    loyaltyReturnAmount: string;
    loyaltyForcedCount: string;
    loyaltyForcedAmount: string;
    loyaltyActivateCount: string;
    loyaltyActivateAmount: string;
    loyaltyDeactivateCount: string;
    loyaltyDeactivateAmount: string;
    cashSaleCount: string;
    cashSaleAmount: string;
    cashReturnCount: string;
    cashReturnAmount: string;
    checkSaleCount: string;
    checkSaleAmount: string;
    checkAdjustCount: string;
    checkAdjustAmount: string;
}

class PaxLocalTotalReport {
    creditSaleCount: string;
    creditSaleAmount: string;
    creditForcedCount: string;
    creditForcedAmount: string;
    creditReturnCount: string;
    creditReturnAmount: string;
    creditAuthCount: string;
    creditAuthAmount: string;
    creditPostAuthCount: string;
    creditPostAuthAmount: string;
    debitSaleCount: string;
    debitSaleAmount: string;
    debitReturnCount: string;
    debitReturnAmount: string;
    eBTSaleCount: string;
    eBTSaleAmount: string;
    eBTReturnCount: string;
    eBTReturnAmount: string;
    eBTWithdrawalCount: string;
    eBTWithdrawalAmount: string;
    giftSaleCount: string;
    giftSaleAmount: string;
    giftAuthCount: string;
    giftAuthAmount: string;
    giftPostAuthCount: string;
    giftPostAuthAmount: string;
    giftActivateCount: string;
    giftActivateAmount: string;
    giftIssueCount: string;
    giftIssueAmount: string;
    giftReloadCount: string;
    giftReloadAmount: string;
    giftReturnCount: string;
    giftReturnAmount: string;
    giftForcedCount: string;
    giftForcedAmount: string;
    giftCashoutCount: string;
    giftCashoutAmount: string;
    giftDeactivateCount: string;
    giftDeactivateAmount: string;
    giftAdjustCount: string;
    giftAdjustAmount: string;
    loyaltyRedeemCount: string;
    loyaltyRedeemAmount: string;
    loyaltyIssueCount: string;
    loyaltyIssueAmount: string;
    loyaltyReloadCount: string;
    loyaltyReloadAmount: string;
    loyaltyReturnCount: string;
    loyaltyReturnAmount: string;
    loyaltyForcedCount: string;
    loyaltyForcedAmount: string;
    loyaltyActivateCount: string;
    loyaltyActivateAmount: string;
    loyaltyDeactivateCount: string;
    loyaltyDeactivateAmount: string;
    cashSaleCount: string;
    cashSaleAmount: string;
    cashReturnCount: string;
    cashReturnAmount: string;
    checkSaleCount: string;
    checkSaleAmount: string;
    checkAdjustCount: string;
    checkAdjustAmount: string;

    constructor({
                    creditSaleCount,
                    creditSaleAmount,
                    creditForcedCount,
                    creditForcedAmount,
                    creditReturnCount,
                    creditReturnAmount,
                    creditAuthCount,
                    creditAuthAmount,
                    creditPostAuthCount,
                    creditPostAuthAmount,
                    debitSaleCount,
                    debitSaleAmount,
                    debitReturnCount,
                    debitReturnAmount,
                    eBTSaleCount,
                    eBTSaleAmount,
                    eBTReturnCount,
                    eBTReturnAmount,
                    eBTWithdrawalCount,
                    eBTWithdrawalAmount,
                    giftSaleCount,
                    giftSaleAmount,
                    giftAuthCount,
                    giftAuthAmount,
                    giftPostAuthCount,
                    giftPostAuthAmount,
                    giftActivateCount,
                    giftActivateAmount,
                    giftIssueCount,
                    giftIssueAmount,
                    giftReloadCount,
                    giftReloadAmount,
                    giftReturnCount,
                    giftReturnAmount,
                    giftForcedCount,
                    giftForcedAmount,
                    giftCashoutCount,
                    giftCashoutAmount,
                    giftDeactivateCount,
                    giftDeactivateAmount,
                    giftAdjustCount,
                    giftAdjustAmount,
                    loyaltyRedeemCount,
                    loyaltyRedeemAmount,
                    loyaltyIssueCount,
                    loyaltyIssueAmount,
                    loyaltyReloadCount,
                    loyaltyReloadAmount,
                    loyaltyReturnCount,
                    loyaltyReturnAmount,
                    loyaltyForcedCount,
                    loyaltyForcedAmount,
                    loyaltyActivateCount,
                    loyaltyActivateAmount,
                    loyaltyDeactivateCount,
                    loyaltyDeactivateAmount,
                    cashSaleCount,
                    cashSaleAmount,
                    cashReturnCount,
                    cashReturnAmount,
                    checkSaleCount,
                    checkSaleAmount,
                    checkAdjustCount,
                    checkAdjustAmount,
                }: PaxLocalTotalReportParams) {
        this.creditSaleCount = creditSaleCount;
        this.creditSaleAmount = creditSaleAmount;
        this.creditForcedCount = creditForcedCount;
        this.creditForcedAmount = creditForcedAmount;
        this.creditReturnCount = creditReturnCount;
        this.creditReturnAmount = creditReturnAmount;
        this.creditAuthCount = creditAuthCount;
        this.creditAuthAmount = creditAuthAmount;
        this.creditPostAuthCount = creditPostAuthCount;
        this.creditPostAuthAmount = creditPostAuthAmount;
        this.debitSaleCount = debitSaleCount;
        this.debitSaleAmount = debitSaleAmount;
        this.debitReturnCount = debitReturnCount;
        this.debitReturnAmount = debitReturnAmount;
        this.eBTSaleCount = eBTSaleCount;
        this.eBTSaleAmount = eBTSaleAmount;
        this.eBTReturnCount = eBTReturnCount;
        this.eBTReturnAmount = eBTReturnAmount;
        this.eBTWithdrawalCount = eBTWithdrawalCount;
        this.eBTWithdrawalAmount = eBTWithdrawalAmount;
        this.giftSaleCount = giftSaleCount;
        this.giftSaleAmount = giftSaleAmount;
        this.giftAuthCount = giftAuthCount;
        this.giftAuthAmount = giftAuthAmount;
        this.giftPostAuthCount = giftPostAuthCount;
        this.giftPostAuthAmount = giftPostAuthAmount;
        this.giftActivateCount = giftActivateCount;
        this.giftActivateAmount = giftActivateAmount;
        this.giftIssueCount = giftIssueCount;
        this.giftIssueAmount = giftIssueAmount;
        this.giftReloadCount = giftReloadCount;
        this.giftReloadAmount = giftReloadAmount;
        this.giftReturnCount = giftReturnCount;
        this.giftReturnAmount = giftReturnAmount;
        this.giftForcedCount = giftForcedCount;
        this.giftForcedAmount = giftForcedAmount;
        this.giftCashoutCount = giftCashoutCount;
        this.giftCashoutAmount = giftCashoutAmount;
        this.giftDeactivateCount = giftDeactivateCount;
        this.giftDeactivateAmount = giftDeactivateAmount;
        this.giftAdjustCount = giftAdjustCount;
        this.giftAdjustAmount = giftAdjustAmount;
        this.loyaltyRedeemCount = loyaltyRedeemCount;
        this.loyaltyRedeemAmount = loyaltyRedeemAmount;
        this.loyaltyIssueCount = loyaltyIssueCount;
        this.loyaltyIssueAmount = loyaltyIssueAmount;
        this.loyaltyReloadCount = loyaltyReloadCount;
        this.loyaltyReloadAmount = loyaltyReloadAmount;
        this.loyaltyReturnCount = loyaltyReturnCount;
        this.loyaltyReturnAmount = loyaltyReturnAmount;
        this.loyaltyForcedCount = loyaltyForcedCount;
        this.loyaltyForcedAmount = loyaltyForcedAmount;
        this.loyaltyActivateCount = loyaltyActivateCount;
        this.loyaltyActivateAmount = loyaltyActivateAmount;
        this.loyaltyDeactivateCount = loyaltyDeactivateCount;
        this.loyaltyDeactivateAmount = loyaltyDeactivateAmount;
        this.cashSaleCount = cashSaleCount;
        this.cashSaleAmount = cashSaleAmount;
        this.cashReturnCount = cashReturnCount;
        this.cashReturnAmount = cashReturnAmount;
        this.checkSaleCount = checkSaleCount;
        this.checkSaleAmount = checkSaleAmount;
        this.checkAdjustCount = checkAdjustCount;
        this.checkAdjustAmount = checkAdjustAmount;
    }

    static fromList(data: any[]) {
        return new PaxLocalTotalReport({
            creditSaleCount: data[0]!,
            creditSaleAmount: data[1]!,
            creditForcedCount: data[2]!,
            creditForcedAmount: data[3]!,
            creditReturnCount: data[4]!,
            creditReturnAmount: data[5]!,
            creditAuthCount: data[6]!,
            creditAuthAmount: data[7]!,
            creditPostAuthCount: data[8]!,
            creditPostAuthAmount: data[9]!,
            debitSaleCount: data[10]!,
            debitSaleAmount: data[11]!,
            debitReturnCount: data[12]!,
            debitReturnAmount: data[13]!,
            eBTSaleCount: data[14]!,
            eBTSaleAmount: data[15]!,
            eBTReturnCount: data[16]!,
            eBTReturnAmount: data[17]!,
            eBTWithdrawalCount: data[18]!,
            eBTWithdrawalAmount: data[19]!,
            giftSaleCount: data[20]!,
            giftSaleAmount: data[21]!,
            giftAuthCount: data[22]!,
            giftAuthAmount: data[23]!,
            giftPostAuthCount: data[24]!,
            giftPostAuthAmount: data[25]!,
            giftActivateCount: data[26]!,
            giftActivateAmount: data[27]!,
            giftIssueCount: data[28]!,
            giftIssueAmount: data[29]!,
            giftReloadCount: data[30]!,
            giftReloadAmount: data[31]!,
            giftReturnCount: data[32]!,
            giftReturnAmount: data[33]!,
            giftForcedCount: data[34]!,
            giftForcedAmount: data[35]!,
            giftCashoutCount: data[36]!,
            giftCashoutAmount: data[37]!,
            giftDeactivateCount: data[38]!,
            giftDeactivateAmount: data[39]!,
            giftAdjustCount: data[40]!,
            giftAdjustAmount: data[41]!,
            loyaltyRedeemCount: data[42]!,
            loyaltyRedeemAmount: data[43]!,
            loyaltyIssueCount: data[44]!,
            loyaltyIssueAmount: data[45]!,
            loyaltyReloadCount: data[46]!,
            loyaltyReloadAmount: data[47]!,
            loyaltyReturnCount: data[48]!,
            loyaltyReturnAmount: data[49]!,
            loyaltyForcedCount: data[50]!,
            loyaltyForcedAmount: data[51]!,
            loyaltyActivateCount: data[52]!,
            loyaltyActivateAmount: data[53]!,
            loyaltyDeactivateCount: data[54]!,
            loyaltyDeactivateAmount: data[55]!, //deactivate
            cashSaleCount: data[56]!,
            cashSaleAmount: data[57]!,
            cashReturnCount: data[58]!,
            cashReturnAmount: data[59]!,
            checkSaleCount: data[60]!,
            checkSaleAmount: data[61]!,
            checkAdjustCount: data[62]!,
            checkAdjustAmount: data[63]!,
        });
    }

    toJson() {
        return {
            creditSaleCount: this.creditSaleCount,
            creditSaleAmount: this.creditSaleAmount,
            creditForcedCount: this.creditForcedCount,
            creditForcedAmount: this.creditForcedAmount,
            creditReturnCount: this.creditReturnCount,
            creditReturnAmount: this.creditReturnAmount,
            creditAuthCount: this.creditAuthCount,
            creditAuthAmount: this.creditAuthAmount,
            creditPostAuthCount: this.creditPostAuthCount,
            creditPostAuthAmount: this.creditPostAuthAmount,
            debitSaleCount: this.debitSaleCount,
            debitSaleAmount: this.debitSaleAmount,
            debitReturnCount: this.debitReturnCount,
            debitReturnAmount: this.debitReturnAmount,
            eBTSaleCount: this.eBTSaleCount,
            eBTSaleAmount: this.eBTSaleAmount,
            eBTReturnCount: this.eBTReturnCount,
            eBTReturnAmount: this.eBTReturnAmount,
            eBTWithdrawalCount: this.eBTWithdrawalCount,
            eBTWithdrawalAmount: this.eBTWithdrawalAmount,
            giftSaleCount: this.giftSaleCount,
            giftSaleAmount: this.giftSaleAmount,
            giftAuthCount: this.giftAuthCount,
            giftAuthAmount: this.giftAuthAmount,
            giftPostAuthCount: this.giftPostAuthCount,
            giftPostAuthAmount: this.giftPostAuthAmount,
            giftActivateCount: this.giftActivateCount,
            giftActivateAmount: this.giftActivateAmount,
            giftIssueCount: this.giftIssueCount,
            giftIssueAmount: this.giftIssueAmount,
            giftReloadCount: this.giftReloadCount,
            giftReloadAmount: this.giftReloadAmount,
            giftReturnCount: this.giftReturnCount,
            giftReturnAmount: this.giftReturnAmount,
            giftForcedCount: this.giftForcedCount,
            giftForcedAmount: this.giftForcedAmount,
            giftCashoutCount: this.giftCashoutCount,
            giftCashoutAmount: this.giftCashoutAmount,
            giftDeactivateCount: this.giftDeactivateCount,
            giftDeactivateAmount: this.giftDeactivateAmount,
            giftAdjustCount: this.giftAdjustCount,
            giftAdjustAmount: this.giftAdjustAmount,
            loyaltyRedeemCount: this.loyaltyRedeemCount,
            loyaltyRedeemAmount: this.loyaltyRedeemAmount,
            loyaltyIssueCount: this.loyaltyIssueCount,
            loyaltyIssueAmount: this.loyaltyIssueAmount,
            loyaltyReloadCount: this.loyaltyReloadCount,
            loyaltyReloadAmount: this.loyaltyReloadAmount,
            loyaltyReturnCount: this.loyaltyReturnCount,
            loyaltyReturnAmount: this.loyaltyReturnAmount,
            loyaltyForcedCount: this.loyaltyForcedCount,
            loyaltyForcedAmount: this.loyaltyForcedAmount,
            loyaltyActivateCount: this.loyaltyActivateCount,
            loyaltyActivateAmount: this.loyaltyActivateAmount,
            loyaltyDeactivateCount: this.loyaltyDeactivateCount,
            loyaltyDeactivateAmount: this.loyaltyDeactivateAmount,
            cashSaleCount: this.cashSaleCount,
            cashSaleAmount: this.cashSaleAmount,
            cashReturnCount: this.cashReturnCount,
            cashReturnAmount: this.cashReturnAmount,
            checkSaleCount: this.checkSaleCount,
            checkSaleAmount: this.checkSaleAmount,
            checkAdjustCount: this.checkAdjustCount,
            checkAdjustAmount: this.checkAdjustAmount,
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
    static COMMAND_TYPE_REPORT_LOCAL_TOTAL_RESPONSE = "R01";

    status: string;
    command: string;
    version: string;
    responseCode: string;
    responseMessage: string;
    paxLocalTotalReport: PaxLocalTotalReport | undefined;
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
            if (item.search("1f") > 0) {
                const subHex = item.split("1f");
                return subHex.map((subItem: any) => hexToString(subItem));
            }
            if (item.search(/3d|26/) > 0) {
                const subHex = item.split(/3d|26/);
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
            })
            if (fields.length >= 7 && command === PaxReportResponse.COMMAND_TYPE_REPORT_LOCAL_TOTAL_RESPONSE) {
                result.paxLocalTotalReport = PaxLocalTotalReport.fromList(fields[7]);
            }
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
import axios, {AxiosResponse} from "axios";
import logger from './utils/logger';

import ReportRequest, {ReportRequestParams} from "./models/request/report-request";
import PaxReportResponse from "./models/response/pax-report-response";

import {
    getLRC,
    stringToHex
} from "./utils";

import {
    PAX_CARD_TYPE,
    PAX_EDC_TYPE,
    PAYMENT_TRANS_TYPE,
    REPORT_TRAN_TYPE
} from "./constants";

import TraceInfo from "./models/request/track-info";
import PaxResponse from "./models/response/pax-response";
import AmountInfo from "./models/request/amount-info";

export type PaxRequest = {
    ip: string;
    port: number;
    timeout?: number;
}

export type MakeCallRequest = {
    command: string;
    args: any[];
    debug?: boolean;
}

export type BuildRequestRequest = {
    command: string;
    args: any[];
    debug?: boolean;
    encode?: boolean;
}

export type MakeCallReportRequest = {
    command: string;
    args: any[];
    debug?: boolean;
}

export type DoVoidRequest = {
    reference?: string;
    transaction: string;
}

export type DoAdjustRequest = {
    reference: string;
    transaction: string;
    amount: number;
}

export type DoSalesRequest = {
    orderID?: string;
    amount: number;
    tips: number;
}

export type DoReturnRequest = {
    amount: number
}

type LocalDetailReportRequest = Pick<ReportRequestParams, "edcType" | "cardType" | "ecrRefNum" | "refNum">;

type LocalTotalReportRequest = Pick<ReportRequestParams, "edcType" | "cardType">;

export default class Pax {
    static PROTO_VERSION = "1.28";
    static instance: Pax;
    ip: string | undefined;
    port: number | undefined;
    timeout: number | undefined;

    constructor({
                    ip,
                    port,
                    timeout = 120
                }: PaxRequest) {
        if (Pax.instance) {
            Pax.instance.setConfig({
                ip: ip,
                port: port,
                timeout: timeout
            });
            return Pax.instance;
        }
        this.ip = ip;
        this.port = port;
        this.timeout = timeout;
        Pax.instance = this;
    }

    setConfig({ip, port, timeout}: PaxRequest) {
        this.ip = ip;
        this.port = port;
        this.timeout = timeout;
    }

    buildRequest({
                     command,
                     args,
                     // @ts-ignore
                     debug = false,
                     encode = true
                 }: BuildRequestRequest) {
        const argsStr = args.map((arg: any) => {
            return Array.isArray(arg) ? arg.join(String.fromCharCode(31)) : arg
        }).join(String.fromCharCode(28));

        let cmd: string =
            String.fromCharCode(2) +
            command +
            String.fromCharCode(28) +
            Pax.PROTO_VERSION +
            String.fromCharCode(28) +
            argsStr +
            String.fromCharCode(3);
        cmd = cmd + getLRC(cmd);

        if (!encode) return cmd;
        return btoa(cmd);
    }

    parseResponse(response: string): PaxResponse | null {
        const checkParams = stringToHex(response).split(" ").pop();
        const redundancyCheck = stringToHex(response).split(" ").pop()?.substring(1);
        const lrcFromResponse = getLRC(checkParams!);
        if (lrcFromResponse !== redundancyCheck) {
            throw new Error(`LRC Mismatch! Got ${lrcFromResponse} but expected ${redundancyCheck}`);
        }
        return PaxResponse.fromString(response);
    }

    parseReportResponse(response: string): PaxReportResponse | null {
        const checkParams = stringToHex(response).split(" ").pop();
        const redundancyCheck = stringToHex(response).split(" ").pop()?.substring(1);
        const lrcFromResponse = getLRC(checkParams!);
        if (lrcFromResponse !== redundancyCheck) {
            throw new Error(`LRC Mismatch! Got ${lrcFromResponse} but expected ${redundancyCheck}`);
        }
        return PaxReportResponse.fromString(response);
    }

    async httpRequest(query: string) {
        const baseUrl = "http://" + this.ip + ":" + this.port?.toString();
        console.log(baseUrl)
        const processUrl = "/?" + query;

        return axios({
            method: 'GET',
            baseURL: baseUrl,
            url: processUrl,
            timeout: this.timeout! * 1000,
        }).then((response: AxiosResponse) => {
            if (response?.status < 200 || response?.status > 400 || !response?.data) {
                throw new Error("Error while fetching data");
            }
            return response.data;
        }).catch((error: any) => {
            console.log({'httpRequestError': error});
            throw new Error("Error while fetching data");
        });
    }

    makeCall({command, args, debug = false}: MakeCallRequest): Promise<PaxResponse | null> {
        return new Promise(async resolve => {
            try {
                const query = this.buildRequest({
                    command: command,
                    args: args,
                    debug: debug
                });
                logger.info(`PAX REQUEST Query: [${this.ip}/${this.port}?${query}] - Command: [${command}] - DATA: [${args}]`);

                const result = await this.httpRequest(query).catch((error: any) => {
                    throw new Error(`PAX REQUEST fail Query: [${this.ip}/${this.port}?${query}] Error: ${error.message}`);
                });
                if (!result) {
                    throw new Error(`PAX REQUEST fail Query: [${this.ip}/${this.port}?${query}] Error: 'Result null!'`);
                }
                logger.success(`PAX REQUEST Query: [${this.ip}/${this.port}?${query}] - RESPONSE: [${JSON.stringify(result)}]`);
                const paxResponse = this.parseResponse(result);
                logger.success(`PAX REQUEST Query: [${this.ip}/${this.port}?${query}] - RESPONSE: [${JSON.stringify(paxResponse)}]`);
                return resolve(paxResponse);
            } catch (error: any) {
                logger.error(error.message);
                console.error(error)
                return resolve(null);
            }
        })
    }

    makeCallReport({command, args, debug}: MakeCallReportRequest): Promise<PaxReportResponse | null> {
        return new Promise(async resolve => {
            try {
                const query = this.buildRequest({command: command, args: args, debug: debug});
                logger.info(`PAX REQUEST Query: [${this.ip}/${this.port}?${query}] - Command: [${command}] - DATA: [${args}]`);
                const result = await this.httpRequest(query).catch((error: any) => {
                    throw new Error(`PAX REQUEST fail Query: [${this.ip}/${this.port}?${query}] Error: ${error.message}`);
                });
                if (!result) {
                    throw new Error(`PAX REQUEST fail Query: [${this.ip}/${this.port}?${query}] Error: 'Result null!'`);
                }
                logger.success(`PAX REQUEST Query: [${this.ip}/${this.port}?${query}] - RESPONSE: [${JSON.stringify(result)}]`);
                const paxReportResponse = this.parseReportResponse(result);
                logger.success(`PAX REQUEST Query: [${this.ip}/${this.port}?${query}] - RESPONSE: [${JSON.stringify(paxReportResponse)}]`);
                return resolve(paxReportResponse);
            } catch (error: any) {
                logger.error(error.message);
                console.error(error);
                return resolve(null);
            }
        })
    }

    async doMenu(): Promise<boolean> {
        return new Promise(async resolve => {
            const args = [PAYMENT_TRANS_TYPE.TRAN_TYPE_MENU, '', '', '1', '', '', '', '', ''];
            const response = await this.makeCall({
                command: "T00",
                args: args
            });
            if (response !== null) {
                if (
                    response.responseCode === "000000" &&
                    response.responseMessage === "OK"
                ) {
                    return resolve(true);
                }
            }
            return resolve(false);
        })
    }

    async doSales({orderID, amount, tips}: DoSalesRequest): Promise<PaxResponse | null> {
        logger.info(`PAX REQUEST : [do_sales] - Order_ID: [${orderID}] - DATA: [Amount: ${amount} - tips: ${tips}]`);
        const amountRequest = new AmountInfo({
            transactionAmount: amount.toString(),
            tipAmount: (tips === 0 || tips === null || isNaN(tips)) ? '0' : tips.toString(),
        });
        const traceRequest = new TraceInfo({
            referenceNumber: orderID,
            invoiceNumber: orderID,
        });
        const args = [
            PAYMENT_TRANS_TYPE.TRAN_TYPE_SALE,
            amountRequest.toListData(),
            '',
            traceRequest.toListData(),
            '',
            '',
            '',
            '',
            ''
        ];
        return this.makeCall({
            command: "T00",
            args: args
        });
    }

    async doAdjust({reference, transaction, amount}: DoAdjustRequest): Promise<PaxResponse | null> {
        logger.info(`PAX REQUEST : [do_adjust] - Order_ID: [${reference}] - DATA: [tran_id: ${transaction} - tips: ${amount}]`);
        const amountRequest = new AmountInfo({
            transactionAmount: Math.round(amount * 100).toString()
        });
        const traceRequest = new TraceInfo({
            transactionNumber: transaction,
            referenceNumber: reference
        });
        const args = [
            PAYMENT_TRANS_TYPE.TRAN_TYPE_ADJUST,
            amountRequest.toListData(),
            '',
            traceRequest.toListData(),
            '',
            '',
            '',
            '',
            ''
        ];
        return this.makeCall({
            command: "T00",
            args: args
        });
    }

    async doReturn({amount}: DoReturnRequest): Promise<PaxResponse | null> {
        logger.info(`PAX REQUEST : [do_return] - DATA: [amount: ${amount}]`);
        const amountRequest = new AmountInfo({
            transactionAmount: amount.toString(),
        });
        const traceRequest = new TraceInfo({});
        const args = [
            PAYMENT_TRANS_TYPE.TRAN_TYPE_RETURN,
            amountRequest.toListData(),
            '',
            traceRequest.toListData(),
            '',
            '',
            '',
            '',
            ''
        ];
        return this.makeCall({
            command: "T00",
            args: args
        });
    }

    async doVoid({reference, transaction}: DoVoidRequest): Promise<PaxResponse | null> {
        logger.info(`PAX REQUEST : [do_void] - Order_id: ${reference} DATA: [Tran_id: ${transaction}]`);
        const traceRequest = new TraceInfo({
            transactionNumber: transaction,
            referenceNumber: reference
        });
        const args = [
            PAYMENT_TRANS_TYPE.TRAN_TYPE_VOID,
            '',
            '',
            traceRequest.toListData(),
            '',
            '',
            '',
            '',
            '',
        ];

        return this.makeCall({
            command: 'T00',
            args: args
        });
    }

    async doBatchClose(): Promise<PaxResponse | null> {
        return this.makeCall({
            command: 'B00',
            args: [],
        });
    }

    async localDetailReport({
                                edcType = PAX_EDC_TYPE.ALL,
                                cardType = PAX_CARD_TYPE.ALL,
                                ecrRefNum = '',
                                refNum = ''
                            }: LocalDetailReportRequest = {}): Promise<PaxReportResponse | null> {
        const reportRequest = new ReportRequest({
            edcType: edcType,
            cardType: cardType,
            ecrRefNum: ecrRefNum,
            refNum: refNum,
        });
        return this.makeCallReport({
            command: REPORT_TRAN_TYPE.LOCALDETAILREPORT,
            args: reportRequest.toListData()
        });
    }

    async localTotalReport({
                               edcType = PAX_EDC_TYPE.ALL,
                           }: LocalTotalReportRequest = {}): Promise<PaxReportResponse | null> {
        const reportRequest = new ReportRequest({
            edcType: edcType,
        });
        return this.makeCallReport({
            command: REPORT_TRAN_TYPE.LOCALTOTALREPORT,
            args: reportRequest.toListData()
        });
    }
}

(window as any).Pax = Pax;
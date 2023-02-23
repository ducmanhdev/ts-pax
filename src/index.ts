import axios, {AxiosResponse} from "axios";
import logger from './utils/logger';

import ReportRequest from "./models/request/report-request";
import PaxReportResponse from "./models/response/pax-report-response";

import {
    hexToBase64,
    getLRC,
    strEncodeUTF16, trim, base64ToHex
} from "./utils";

import {
    PAX_EDC_TYPE,
    PAYMENT_TRANS_TYPE, REPORT_TRAN_TYPE
} from "./constants";

import TraceInfo from "./models/request/track-info";
import PaxResponse from "./models/response/pax-response";
import AmountInfo from "./models/request/amount-info";

type MakeCallParams = {
    command: string;
    args: any[];
    debug?: boolean;
}
type PaxParams = {
    host?: string;
    port?: number;
    timeout?: number;
}
type BuildRequestParams = {
    command: string;
    args: any[];
    debug?: boolean;
    encode?: boolean;
}

type MakeCallReportParams = {
    command: string;
    args: any[];
    debug?: boolean;
}

type DoVoidParams = {
    reference: string;
    transaction: string;
}

type DoAdjustParams = {
    reference: string;
    transaction: string;
    amount: number;
}

type DoSalesParams = {
    orderID: string;
    amount: number;
    tips: number;
}

class Pax {
    static PROTO_VERSION = "1.47";
    static instance: Pax;
    host: string | undefined;
    port: number | undefined;
    timeout: number | undefined;

    constructor({
                    host = "127.0.0.1",
                    port = 10009,
                    timeout = 120
                }: PaxParams) {
        if (Pax.instance) {
            Pax.instance.setConfig({
                host: host,
                port: port,
                timeout: timeout
            });
            return Pax.instance;
        }
        this.host = host;
        this.port = port;
        this.timeout = timeout;
        Pax.instance = this;
    }

    setConfig({host, port, timeout}: PaxParams) {
        this.host = host;
        this.port = port;
        this.timeout = timeout;
    }

    buildRequest({
                     command,
                     args,
                     // @ts-ignore
                     debug = false,
                     encode = true
                 }: BuildRequestParams) {
        let args_str: string = "";
        const processed_args: any[] = [];

        ////////// Step 1
        args.forEach((element: any) => {
            if (Array.isArray(element)) {
                return processed_args.push(element.join(String.fromCharCode(31)));
            }
            processed_args.push(element);
        });

        ////////// STEP 2
        if (args.length > 0) {
            args_str = processed_args.join(String.fromCharCode(28)) + String.fromCharCode(28);
        }
        console.log(args)
        console.log(processed_args)
        console.log(args_str)

        ///////// STEP 3
        let cmd: string = command +
            String.fromCharCode(28) +
            Pax.PROTO_VERSION +
            String.fromCharCode(28) +
            args_str +
            String.fromCharCode(3);

        cmd = String.fromCharCode(2) + cmd + getLRC(cmd);
        /////////////// END

        if (!encode) return cmd;
        return btoa(cmd.toString());
    }

    parseResponse(response: string): PaxResponse | null {
        const lrcFromResponse = response.codePointAt(response.length - 1);
        const processResponse = trim(response, String.fromCharCode(2));
        const lrc = processResponse.split(String.fromCharCode(3));
        const expected = getLRC(response.substring(1, response.length - 1));
        if (lrcFromResponse?.toString() !== expected) {
            throw new Error(`LRC Mismatch! Got ${lrcFromResponse?.toString()} but expected ${expected.toString()}`);
        }
        if (!lrc[0]) {
            throw new Error(`LRC not found!`);
        }
        return PaxResponse.fromString(lrc[0]);
    }

    parseReportResponse(response: string): PaxReportResponse | null {
        const lrcFromResponse = response.codePointAt(response.length - 1);
        const processResponse = trim(response, String.fromCharCode(2));
        const lrc = processResponse.split(String.fromCharCode(3));
        const expected = getLRC(response.substring(1, response.length - 1));
        if (lrcFromResponse?.toString() !== expected) {
            throw new Error(`LRC Mismatch! Got ${lrcFromResponse?.toString()} but expected ${expected.toString()}`);
        }
        if (!lrc[0]) {
            throw new Error(`LRC not found!`);
        }
        return PaxReportResponse.fromString(lrc[0]);
    }

    async httpRequest(query: string) {
        const baseUrl = "http://" + this.host + ":" + this.port?.toString();
        const processUrl = "/?" + query;
        // console.log("Call PAX QUERY: " + processUrl);
        return axios({
            method: 'GET',
            baseURL: baseUrl,
            url: processUrl,
            timeout: this.timeout! * 1000,
        }).then((response: AxiosResponse) => {
            console.log({'httpRequestResponse': response});
            if (response?.status < 200 || response?.status > 400 || !response?.data) {
                // console.log(`Network Util ERROR: ${processUrl}`);
                throw new Error("Error while fetching data");
            } else {
                return response.data;
            }
        }).catch((error: any) => {
            console.log({'httpRequestError': error});
            // console.log(`Network Util ERROR: ${processUrl}`);
            throw new Error("Error while fetching data");
        });
    }

    makeCall({command, args, debug = false}: MakeCallParams): Promise<PaxResponse | null> {
        return new Promise(async resolve => {
            try {
                const query = this.buildRequest({
                    command: command,
                    args: args,
                    debug: debug
                });
                // console.log("PAX SENT QUERY: " + query);
                logger.info(`PAX REQUEST Query: [${this.host}/?${query}] - Command: [${command}] - DATA: [${args}]`);

                const result = await this.httpRequest(query).catch((error: any) => {
                    throw new Error(`PAX REQUEST fail Query: [${this.host}/?${query}] Error: ${error.message}`);
                });

                if (!result) {
                    throw new Error(`PAX REQUEST fail Query: [${this.host}/?${query}] Error: 'Result null!'`);
                }
                // console.log("PAX RESPONSE: " + result);
                logger.success(`PAX REQUEST Query: [${this.host}/?${query}] - RESPONSE: [${result}]`);
                const paxResponse = this.parseResponse(result);
                // console.log(paxResponse?.toString());
                logger.success(`PAX REQUEST Query: [${this.host}/?${query}] - RESPONSE: [${paxResponse?.toString()}]`);
                return resolve(paxResponse)
            } catch (error: any) {
                logger.error(error.message);
                return resolve(null);
            }
        })
    }

    makeCallReport({command, args, debug}: MakeCallReportParams): Promise<PaxReportResponse | null> {
        return new Promise(async resolve => {
            try {
                const query = this.buildRequest({command: command, args: args, debug: debug});
                // console.log("PAX SENT QUERY: " + query);
                logger.info(`PAX REQUEST Query: [${this.host}/?${query}] - Command: [${command}] - DATA: [${args}]`);

                const result = await this.httpRequest(query).catch((error: any) => {
                    throw new Error(`PAX REQUEST fail Query: [${this.host}/?${query}] Error: ${error.message}`);
                });
                if (!result) {
                    throw new Error(`PAX REQUEST fail Query: [${this.host}/?${query}] Error: 'Result null!'`);
                }
                // console.log("PAX RESPONSE: " + result);
                logger.success(`PAX REQUEST Query: [${this.host}/?${query}] - RESPONSE: [${result}]`);
                const paxReportResponse = this.parseReportResponse(result);
                // console.log(paxReportResponse?.toString());
                logger.success(`PAX REQUEST Query: [${this.host}/?${query}] - RESPONSE: [${paxReportResponse?.toString()}]`);
                return resolve(paxReportResponse);
            } catch (error: any) {
                logger.error(error.message);
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

    async doSales({orderID, amount, tips}: DoSalesParams): Promise<PaxResponse | null> {
        logger.info(`PAX REQUEST : [do_sales] - Order_ID: [${orderID}] - DATA: [Amount: ${amount} - tips: ${tips}]`);
        const amountRequest = new AmountInfo({
            transactionAmount: amount.toString(),
            tipAmount: (tips === 0 || tips === null || isNaN(tips)) ? '0' : tips.toString(),
        });
        const traceRequest = new TraceInfo({
            invoiceNumber: orderID,
            referenceNumber: orderID
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

    async doAdjust({reference, transaction, amount}: DoAdjustParams): Promise<PaxResponse | null> {
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

    async doReturn(amount: number): Promise<PaxResponse | null> {
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

    async doVoid({reference, transaction}: DoVoidParams): Promise<PaxResponse | null> {
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

    async batchClose(): Promise<PaxResponse | null> {
        return this.makeCall({
            command: 'B00',
            args: [],
        });
    }

    async localDetailReport(orderId: string): Promise<PaxReportResponse | null> {
        // EX Request : http://10.1.1.24:10009?AlIwMhwxLjQ1HDAwHBwcHBwcNzc2HANn
        // http://10.1.1.24:10009?AlIwMhwxLjQ1HDAwHBwcHBwcHANR
        // Message Request   [02] R02 [28] 1.45 [28] EDCType [28] CardType [28] PaymentType [28] RecordNum [28] RefNum [28] AuthCode [28] ECRRefNum [28] [03] LRC
        // Message Request ERCNum:  [02] R02 [28] 1.45 [28] 00 [28] [28] [28] [28] [28] [28] 776 [28] [03] LRC
        // Message Request RefNum:  [02] R02 [28] 1.45 [28] 00 [28] [28] [28] [28] 2 [28] [28] 776 [28] [03] LRC

        // Response [02]
        // 0
        // [1c]R03
        // [1c]1.40
        // [1c]000000
        // [1c]OK


        // [1c]1 --total_record
        // [1c]0 -- record_number
        // [1c]0[1f]DEMO APPROVED[1f]000000[1f]88888888[1f][1f][1f]   [host_response,message,auth_code,host_code, , , ,]
        // [1c]01 -- edc_type
        // [1c]01 -- payment_type
        // [1c]
        // [1c] 4500  [1f]  0 [1f] 0  [1f] 0  [1f]  0 [1f]  0 [1f]  12048 [1f]  2022  [amount,0,0,0,0,0,remain_balance,extra_balance]
        // [1c]1034[1f]4[1f]0823[1f][1f][1f][1f]03[1f]PHAM/LINH                 [1f][1f][1f]0       [account_information]
        // [1c]2[1f]776[1f]20210412043119[1f]776      [trace_infomation]
        // [1c][1f]
        // [1c]
        // [1c]
        // [1c]CARDBIN=372727[1f]SN=53344914[1f]TC=FEDD2F8578265FEE[1f]TVR=0000008000[1f]AID=A000000025010801[1f]TSI=E800[1f]ATC=055A[1f]APPLAB=AMERICAN EXPRESS[1f]IAD=064C010321B802[1f]ARC=Z3[1f]CID=00[1f]CVM=6
        // [03]C

        logger.info(`PAX REQUEST : [local_detail_report] - Order_ID: [${orderId}]`);
        const reportRequest = new ReportRequest({
            edcType: PAX_EDC_TYPE.ALL,
            ecrRefNum: orderId
        });
        return this.makeCallReport({
            command: REPORT_TRAN_TYPE.LOCALDETAILREPORT,
            args: reportRequest.toListData()
        });
    }
}

(window as any).Pax = Pax;
export default Pax;
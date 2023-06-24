import {isIP} from 'is-ip';

import ReportRequest from "./models/request/report-request";
import PaxReportResponse from "./models/response/pax-report-response";
import {GapMiniAppSdk} from "gap-miniapp-sdk";
import {getLRC, parseJSON, stringToHex} from "./utils";
import {REPORT_TRAN_TYPE, TRANS_TYPE} from "./constants";

import TraceInfo from "./models/request/track-info";
import PaxResponse from "./models/response/pax-response";
import AmountInfo from "./models/request/amount-info";
import ShowDialogRequest, {ShowDialogRequestParams} from "./models/request/show-dialog-request";
import ShowTextBoxRequest, {ShowTextBoxRequestParams} from "./models/request/show-text-box-request";
import {
    BuildRequestRequestParams,
    DoAdjustRequestParams,
    DoReturnRequestParams,
    DoSalesRequestParams,
    DoVoidRequestParams, HTTPRequestResponse,
    LocalDetailReportRequestParams,
    LocalTotalReportRequestParams,
    MakeCallReportRequestParams,
    MakeCallRequestParams,
    PaxRequestParams
} from "./types";

export * from "./constants";

export default class Pax {
    static PROTO_VERSION = "1.28";
    static instance: Pax;
    ip!: string;
    port!: number;
    timeout!: number;
    miniApp!: GapMiniAppSdk;

    constructor(config: PaxRequestParams) {
        if (!isIP(config.ip)) throw new Error('Missing ip or ip is invalid!');
        if (!config.miniApp) throw new Error('Missing miniApp!');
        if (Pax.instance) {
            Pax.instance.setConfig(config);
            return Pax.instance;
        }
        Pax.instance = this;
        Pax.instance.setConfig(config);
    }

    setConfig({ip, port = 10009, miniApp, timeout = 120}: PaxRequestParams) {
        this.ip = ip;
        this.port = port;
        this.miniApp = miniApp;
        this.timeout = timeout;
    }

    buildRequest({
                     command,
                     args,
                     debug = false,
                     encode = true,
                 }: BuildRequestRequestParams) {
        const argsStr = args.map((arg: any) => {
            return Array.isArray(arg) ? arg.join(String.fromCharCode(31)) : arg
        }).join(String.fromCharCode(28));
        if(debug) {
            console.log(debug)
        }
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

    async httpRequest(query: string): Promise<HTTPRequestResponse> {
        const url = new URL(`http://${this.ip}`);
        url.port = '' + this.port;
        url.search = query;

        if (!this.miniApp) {
            const res = await fetch(url, {
                signal: AbortSignal.timeout(this.timeout!),
            });
            return res.json();
        }
        return this.miniApp.gapHttpRequest({
            method: "GET",
            url: url.toString(),
            data: null,
            timeout: this.timeout
        });
    }

    checkResponse(response: HTTPRequestResponse) {
        if (!response) throw new Error(`Response null!`);
        response = parseJSON(response);
        const checkParams = stringToHex(response).split(" ").pop();
        const redundancyCheck = stringToHex(response).split(" ").pop()?.substring(1);
        const lrcFromResponse = getLRC(checkParams!);
        if (lrcFromResponse !== redundancyCheck) throw new Error(`LRC Mismatch! Got ${lrcFromResponse} but expected ${redundancyCheck}`);
    }

    makeCall(request: MakeCallRequestParams) {
        return new Promise<PaxResponse | null>(async resolve => {
            try {
                const query = this.buildRequest(request);
                const response = await this.httpRequest(query);
                this.checkResponse(response);
                const paxResponse = PaxResponse.fromString(response as string);
                resolve(paxResponse);
            } catch (error: any) {
                console.error(error)
                resolve(null);
            }
        })
    }

    makeCallReport(request: MakeCallReportRequestParams) {
        return new Promise<PaxReportResponse | null>(async resolve => {
            try {
                const query = this.buildRequest(request);
                const response = await this.httpRequest(query);
                this.checkResponse(response);
                const paxReportResponse = PaxReportResponse.fromString(response as string);
                resolve(paxReportResponse);
            } catch (error: any) {
                console.error(error);
                resolve(null);
            }
        })
    }

    doInitialize() {
        return this.makeCall({
            command: "A00",
            args: []
        });
    }

    doMenu() {
        const args = [TRANS_TYPE.MENU, '', '', '1', '', '', '', '', ''];
        return this.makeCall({
            command: "T00",
            args: args
        });
    }

    doSales({orderID, amount, tips}: DoSalesRequestParams) {
        const amountRequest = new AmountInfo({
            transactionAmount: amount.toString(),
            tipAmount: (tips === 0 || tips === null || isNaN(tips)) ? '0' : tips.toString(),
        });
        const traceRequest = new TraceInfo({
            referenceNumber: orderID,
            invoiceNumber: orderID,
        });
        const args = [
            TRANS_TYPE.SALE,
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

    doAdjust({reference, transaction, amount}: DoAdjustRequestParams) {
        const amountRequest = new AmountInfo({
            transactionAmount: Math.round(amount * 100).toString()
        });
        const traceRequest = new TraceInfo({
            transactionNumber: transaction,
            referenceNumber: reference
        });
        const args = [
            TRANS_TYPE.ADJUST,
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

    doReturn({orderId, amount}: DoReturnRequestParams) {
        const amountRequest = new AmountInfo({
            transactionAmount: amount.toString(),
        });
        const traceRequest = new TraceInfo({
            referenceNumber: orderId
        });
        const args = [
            TRANS_TYPE.RETURN,
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

    doVoid({reference, transaction}: DoVoidRequestParams) {
        const traceRequest = new TraceInfo({
            transactionNumber: transaction,
            referenceNumber: reference!,
        });
        const args = [
            TRANS_TYPE.VOID,
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

    doBatchClose() {
        return this.makeCall({
            command: 'B00',
            args: [],
        });
    }

    localDetailReport(request: LocalDetailReportRequestParams = {}) {
        const reportRequest = new ReportRequest(request);
        return this.makeCallReport({
            command: REPORT_TRAN_TYPE.LOCALDETAILREPORT,
            args: reportRequest.toListData()
        });
    }

    localTotalReport(request: LocalTotalReportRequestParams = {}) {
        const reportRequest = new ReportRequest(request);
        return this.makeCallReport({
            command: REPORT_TRAN_TYPE.LOCALTOTALREPORT,
            args: reportRequest.toListData()
        });
    }

    showDialog(request: ShowDialogRequestParams) {
        const showDialogRequest = new ShowDialogRequest(request);
        return this.makeCall({
            command: "A06",
            args: showDialogRequest.toListData()
        });
    }

    showTextBox(request: ShowTextBoxRequestParams) {
        const showTextBoxRequest = new ShowTextBoxRequest(request);
        return this.makeCall({
            command: "A56",
            args: showTextBoxRequest.toListData()
        });
    }
}

(window as any).Pax = Pax;
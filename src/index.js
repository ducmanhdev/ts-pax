"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const logger_1 = __importDefault(require("./utils/logger"));
const report_request_1 = __importDefault(require("./models/request/report-request"));
const pax_report_response_1 = __importDefault(require("./models/response/pax-report-response"));
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const track_info_1 = __importDefault(require("./models/request/track-info"));
const pax_response_1 = __importDefault(require("./models/response/pax-response"));
const amount_info_1 = __importDefault(require("./models/request/amount-info"));
class Pax {
    constructor({ host = "127.0.0.1", port = 10009, timeout = 120 }) {
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
    setConfig({ host, port, timeout }) {
        this.host = host;
        this.port = port;
        this.timeout = timeout;
    }
    buildRequest({ command, args, 
    // @ts-ignore
    debug = false, encode = true }) {
        let args_str = "";
        const processed_args = [];
        ////////// Step 1
        args.forEach((element) => {
            if (Array.isArray(element)) {
                return processed_args.push(element.join(String.fromCharCode(31)));
            }
            processed_args.push(element);
        });
        ////////// STEP 2
        if (args.length > 0) {
            args_str = processed_args.join(String.fromCharCode(28)) + String.fromCharCode(28);
        }
        console.log(args);
        console.log(processed_args);
        console.log(args_str);
        ///////// STEP 3
        let cmd = command +
            String.fromCharCode(28) +
            Pax.PROTO_VERSION +
            String.fromCharCode(28) +
            args_str +
            String.fromCharCode(3);
        cmd = String.fromCharCode(2) + cmd + (0, utils_1.getLRC)(cmd);
        /////////////// END
        if (!encode)
            return cmd;
        return btoa(cmd.toString());
    }
    parseResponse(response) {
        const lrcFromResponse = response.codePointAt(response.length - 1);
        const processResponse = (0, utils_1.trim)(response, String.fromCharCode(2));
        const lrc = processResponse.split(String.fromCharCode(3));
        const expected = (0, utils_1.getLRC)(response.substring(1, response.length - 1));
        if ((lrcFromResponse === null || lrcFromResponse === void 0 ? void 0 : lrcFromResponse.toString()) !== expected) {
            throw new Error(`LRC Mismatch! Got ${lrcFromResponse === null || lrcFromResponse === void 0 ? void 0 : lrcFromResponse.toString()} but expected ${expected.toString()}`);
        }
        if (!lrc[0]) {
            throw new Error(`LRC not found!`);
        }
        return pax_response_1.default.fromString(lrc[0]);
    }
    parseReportResponse(response) {
        const lrcFromResponse = response.codePointAt(response.length - 1);
        const processResponse = (0, utils_1.trim)(response, String.fromCharCode(2));
        const lrc = processResponse.split(String.fromCharCode(3));
        const expected = (0, utils_1.getLRC)(response.substring(1, response.length - 1));
        if ((lrcFromResponse === null || lrcFromResponse === void 0 ? void 0 : lrcFromResponse.toString()) !== expected) {
            throw new Error(`LRC Mismatch! Got ${lrcFromResponse === null || lrcFromResponse === void 0 ? void 0 : lrcFromResponse.toString()} but expected ${expected.toString()}`);
        }
        if (!lrc[0]) {
            throw new Error(`LRC not found!`);
        }
        return pax_report_response_1.default.fromString(lrc[0]);
    }
    httpRequest(query) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const baseUrl = "http://" + this.host + ":" + ((_a = this.port) === null || _a === void 0 ? void 0 : _a.toString());
            const processUrl = "/?" + query;
            // console.log("Call PAX QUERY: " + processUrl);
            return (0, axios_1.default)({
                method: 'GET',
                baseURL: baseUrl,
                url: processUrl,
                timeout: this.timeout * 1000,
            }).then((response) => {
                console.log({ 'httpRequestResponse': response });
                if ((response === null || response === void 0 ? void 0 : response.status) < 200 || (response === null || response === void 0 ? void 0 : response.status) > 400 || !(response === null || response === void 0 ? void 0 : response.data)) {
                    // console.log(`Network Util ERROR: ${processUrl}`);
                    throw new Error("Error while fetching data");
                }
                else {
                    return response.data;
                }
            }).catch((error) => {
                console.log({ 'httpRequestError': error });
                // console.log(`Network Util ERROR: ${processUrl}`);
                throw new Error("Error while fetching data");
            });
        });
    }
    makeCall({ command, args, debug = false }) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = this.buildRequest({
                    command: command,
                    args: args,
                    debug: debug
                });
                // console.log("PAX SENT QUERY: " + query);
                logger_1.default.info(`PAX REQUEST Query: [${this.host}/?${query}] - Command: [${command}] - DATA: [${args}]`);
                const result = yield this.httpRequest(query).catch((error) => {
                    throw new Error(`PAX REQUEST fail Query: [${this.host}/?${query}] Error: ${error.message}`);
                });
                if (!result) {
                    throw new Error(`PAX REQUEST fail Query: [${this.host}/?${query}] Error: 'Result null!'`);
                }
                // console.log("PAX RESPONSE: " + result);
                logger_1.default.success(`PAX REQUEST Query: [${this.host}/?${query}] - RESPONSE: [${result}]`);
                const paxResponse = this.parseResponse(result);
                // console.log(paxResponse?.toString());
                logger_1.default.success(`PAX REQUEST Query: [${this.host}/?${query}] - RESPONSE: [${paxResponse === null || paxResponse === void 0 ? void 0 : paxResponse.toString()}]`);
                return resolve(paxResponse);
            }
            catch (error) {
                logger_1.default.error(error.message);
                return resolve(null);
            }
        }));
    }
    makeCallReport({ command, args, debug }) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = this.buildRequest({ command: command, args: args, debug: debug });
                // console.log("PAX SENT QUERY: " + query);
                logger_1.default.info(`PAX REQUEST Query: [${this.host}/?${query}] - Command: [${command}] - DATA: [${args}]`);
                const result = yield this.httpRequest(query).catch((error) => {
                    throw new Error(`PAX REQUEST fail Query: [${this.host}/?${query}] Error: ${error.message}`);
                });
                if (!result) {
                    throw new Error(`PAX REQUEST fail Query: [${this.host}/?${query}] Error: 'Result null!'`);
                }
                // console.log("PAX RESPONSE: " + result);
                logger_1.default.success(`PAX REQUEST Query: [${this.host}/?${query}] - RESPONSE: [${result}]`);
                const paxReportResponse = this.parseReportResponse(result);
                // console.log(paxReportResponse?.toString());
                logger_1.default.success(`PAX REQUEST Query: [${this.host}/?${query}] - RESPONSE: [${paxReportResponse === null || paxReportResponse === void 0 ? void 0 : paxReportResponse.toString()}]`);
                return resolve(paxReportResponse);
            }
            catch (error) {
                logger_1.default.error(error.message);
                return resolve(null);
            }
        }));
    }
    doMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const args = [constants_1.PAYMENT_TRANS_TYPE.TRAN_TYPE_MENU, '', '', '1', '', '', '', '', ''];
                const response = yield this.makeCall({
                    command: "T00",
                    args: args
                });
                if (response !== null) {
                    if (response.responseCode === "000000" &&
                        response.responseMessage === "OK") {
                        return resolve(true);
                    }
                }
                return resolve(false);
            }));
        });
    }
    doSales({ orderID, amount, tips }) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`PAX REQUEST : [do_sales] - Order_ID: [${orderID}] - DATA: [Amount: ${amount} - tips: ${tips}]`);
            const amountRequest = new amount_info_1.default({
                transactionAmount: amount.toString(),
                tipAmount: (tips === 0 || tips === null || isNaN(tips)) ? '0' : tips.toString(),
            });
            const traceRequest = new track_info_1.default({
                invoiceNumber: orderID,
                referenceNumber: orderID
            });
            const args = [
                constants_1.PAYMENT_TRANS_TYPE.TRAN_TYPE_SALE,
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
        });
    }
    doAdjust({ reference, transaction, amount }) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`PAX REQUEST : [do_adjust] - Order_ID: [${reference}] - DATA: [tran_id: ${transaction} - tips: ${amount}]`);
            const amountRequest = new amount_info_1.default({
                transactionAmount: Math.round(amount * 100).toString()
            });
            const traceRequest = new track_info_1.default({
                transactionNumber: transaction,
                referenceNumber: reference
            });
            const args = [
                constants_1.PAYMENT_TRANS_TYPE.TRAN_TYPE_ADJUST,
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
        });
    }
    doReturn(amount) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`PAX REQUEST : [do_return] - DATA: [amount: ${amount}]`);
            const amountRequest = new amount_info_1.default({
                transactionAmount: amount.toString(),
            });
            const traceRequest = new track_info_1.default({});
            const args = [
                constants_1.PAYMENT_TRANS_TYPE.TRAN_TYPE_RETURN,
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
        });
    }
    doVoid({ reference, transaction }) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`PAX REQUEST : [do_void] - Order_id: ${reference} DATA: [Tran_id: ${transaction}]`);
            const traceRequest = new track_info_1.default({
                transactionNumber: transaction,
                referenceNumber: reference
            });
            const args = [
                constants_1.PAYMENT_TRANS_TYPE.TRAN_TYPE_VOID,
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
        });
    }
    batchClose() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeCall({
                command: 'B00',
                args: [],
            });
        });
    }
    localDetailReport(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
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
            logger_1.default.info(`PAX REQUEST : [local_detail_report] - Order_ID: [${orderId}]`);
            const reportRequest = new report_request_1.default({
                edcType: constants_1.PAX_EDC_TYPE.ALL,
                ecrRefNum: orderId
            });
            return this.makeCallReport({
                command: constants_1.REPORT_TRAN_TYPE.LOCALDETAILREPORT,
                args: reportRequest.toListData()
            });
        });
    }
}
Pax.PROTO_VERSION = "1.47";
window.Pax = Pax;
exports.default = Pax;

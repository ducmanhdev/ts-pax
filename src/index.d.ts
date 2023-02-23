import PaxReportResponse from "./models/response/pax-report-response";
import PaxResponse from "./models/response/pax-response";
type MakeCallParams = {
    command: string;
    args: any[];
    debug?: boolean;
};
type PaxParams = {
    host?: string;
    port?: number;
    timeout?: number;
};
type BuildRequestParams = {
    command: string;
    args: any[];
    debug?: boolean;
    encode?: boolean;
};
type MakeCallReportParams = {
    command: string;
    args: any[];
    debug?: boolean;
};
type DoVoidParams = {
    reference: string;
    transaction: string;
};
type DoAdjustParams = {
    reference: string;
    transaction: string;
    amount: number;
};
type DoSalesParams = {
    orderID: string;
    amount: number;
    tips: number;
};
declare class Pax {
    static PROTO_VERSION: string;
    static instance: Pax;
    host: string | undefined;
    port: number | undefined;
    timeout: number | undefined;
    constructor({ host, port, timeout }: PaxParams);
    setConfig({ host, port, timeout }: PaxParams): void;
    buildRequest({ command, args, debug, encode }: BuildRequestParams): string;
    parseResponse(response: string): PaxResponse | null;
    parseReportResponse(response: string): PaxReportResponse | null;
    httpRequest(query: string): Promise<any>;
    makeCall({ command, args, debug }: MakeCallParams): Promise<PaxResponse | null>;
    makeCallReport({ command, args, debug }: MakeCallReportParams): Promise<PaxReportResponse | null>;
    doMenu(): Promise<boolean>;
    doSales({ orderID, amount, tips }: DoSalesParams): Promise<PaxResponse | null>;
    doAdjust({ reference, transaction, amount }: DoAdjustParams): Promise<PaxResponse | null>;
    doReturn(amount: number): Promise<PaxResponse | null>;
    doVoid({ reference, transaction }: DoVoidParams): Promise<PaxResponse | null>;
    batchClose(): Promise<PaxResponse | null>;
    localDetailReport(orderId: string): Promise<PaxReportResponse | null>;
}
export default Pax;
//# sourceMappingURL=index.d.ts.map
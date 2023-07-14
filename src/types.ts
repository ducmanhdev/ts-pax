import {GapMiniAppSdk} from "gap-miniapp-sdk";
import {ReportRequestParams} from "./models/request/report-request";

export type ContinuousScreen = 0 | 1;
export type EnableHardKey = 0 | 1;
export type SignatureBox = 0 | 1;
export type Reader = 0 | 1;
export type NumericKeys = 'KEY0' | 'KEY1' | 'KEY2' | 'KEY3' | 'KEY4' | 'KEY5' | 'KEY6' | 'KEY7' | 'KEY8' | 'KEY9';
export type ControlKeys = 'KEYCANCEL' | 'KEYNOTER' | 'KEYCLOAK';
export type HardKeys = NumericKeys | ControlKeys;
export type TimeOut = number | '';

export type HTTPRequestResponse = JSON | string | null;
export type PaxRequestParams = {
    ip: string;
    port: number;
    miniApp: GapMiniAppSdk,
    timeout: number;
}
export type MakeCallRequestParams = {
    command: string;
    args: any[];
    debug?: boolean;
}
export type BuildRequestRequestParams = {
    command: string;
    args: any[];
    debug?: boolean;
    encode?: boolean;
}
export type MakeCallReportRequestParams = {
    command: string;
    args: any[];
    debug?: boolean;
}
export type DoVoidRequestParams = {
    reference?: string;
    transaction: string;
}
export type DoAdjustRequestParams = {
    reference: string;
    transaction: string;
    amount: number;
}
export type DoSalesRequestParams = {
    orderID?: string;
    amount: number;
    tips: number;
}
export type DoReturnRequestParams = {
    orderId?: string;
    amount: number;
}
export type LocalDetailReportRequestParams = ReportRequestParams;
export type LocalTotalReportRequestParams = Pick<ReportRequestParams, "edcType" | "cardType">;
import PaxBatchResponse from "./pax-batch-response";
import PaxPaymentResponse from "./pax-payment-response";
import PaxInfoResponse from "./pax-info-response";
import {hexToString, removeUndefinedInObj, stringToHex} from "../../utils";
import PaxShowDialogResponse from "./pax-show-dialog-response";
import PaxShowTextBoxResponse from "./pax-show-text-box-response";
import PaxScanResponse from "./pax-scan-response";

type PaxResponseParams = {
    status: string;
    command: string;
    version: string;
    responseCode: string;
    responseMessage: string;
}

export default class PaxResponse {
    static COMMAND_TYPE_PAYMENT = "T01";
    static COMMAND_TYPE_BATCH = "B01";
    static COMMAND_TYPE_INIT = "A01";
    static COMMAND_TYPE_SHOW_DIALOG = "A07";
    static COMMAND_TYPE_SHOW_TEXT_BOX = "A57";
    static COMMAND_TYPE_SCAN = "A71";

    status;
    command;
    version;
    responseCode;
    responseMessage;

    amount?: number;
    paxPaymentResponse?: PaxPaymentResponse;
    paxBatchResponse?: PaxBatchResponse;
    paxInfoResponse?: PaxInfoResponse;
    paxShowDialogResponse?: PaxShowDialogResponse;
    paxShowTextBoxResponse?: PaxShowTextBoxResponse;
    paxScanResponse?: PaxScanResponse;

    constructor({
                    status,
                    command,
                    version,
                    responseCode,
                    responseMessage
                }: PaxResponseParams) {
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
            return hexToString(item);
        });

        let result = new PaxResponse({
            status: fields[1],
            command: fields[2],
            version: fields[3],
            responseCode: fields[4],
            responseMessage: fields[5],
        });

        removeUndefinedInObj(result);

        if (result.responseCode !== '000000') return result;

        switch (result.command) {
            case PaxResponse.COMMAND_TYPE_INIT: {
                result.paxInfoResponse = PaxInfoResponse.fromList(fields);
                break;
            }
            case PaxResponse.COMMAND_TYPE_PAYMENT: {
                result.paxPaymentResponse = PaxPaymentResponse.fromList(fields);
                break;
            }
            case PaxResponse.COMMAND_TYPE_BATCH: {
                result.paxBatchResponse = PaxBatchResponse.fromList(fields);
                break;
            }
            case PaxResponse.COMMAND_TYPE_SHOW_DIALOG: {
                result.paxShowDialogResponse = PaxShowDialogResponse.fromList(fields);
                break;
            }
            case PaxResponse.COMMAND_TYPE_SHOW_TEXT_BOX: {
                result.paxShowTextBoxResponse = PaxShowTextBoxResponse.fromList(fields);
                break;
            }
            case PaxResponse.COMMAND_TYPE_SCAN: {
                result.paxScanResponse = PaxScanResponse.fromList(fields);
                break;
            }
        }
        return result;
    }

    extraData() {
        switch (this.command) {
            case PaxResponse.COMMAND_TYPE_PAYMENT: {
                return this.paxPaymentResponse?.toJson();
            }
            case PaxResponse.COMMAND_TYPE_BATCH: {
                return this.paxBatchResponse?.toJson();
            }
            case PaxResponse.COMMAND_TYPE_SHOW_DIALOG: {
                return this.paxShowDialogResponse?.toJson();
            }
            case PaxResponse.COMMAND_TYPE_SHOW_TEXT_BOX: {
                return this.paxShowTextBoxResponse?.toJson();
            }
            case PaxResponse.COMMAND_TYPE_SCAN: {
                return this.paxScanResponse?.toJson();
            }
            default: {
                return null;
            }
        }
    }

    toJson() {
        return {
            'status': this.status,
            'command': this.command,
            'version': this.version,
            'response_code': this.responseCode,
            'response_message': this.responseMessage,
            'amount': this.amount,
            'extra_data': this.extraData()
        }
    }
}
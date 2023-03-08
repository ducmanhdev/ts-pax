import PaxBatchResponse from "./pax-batch-response";
import PaxPaymentResponse from "./pax-payment-response";
import {hexToString, stringToHex} from "../../utils";

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

    status: string;
    command: string;
    version: string;
    responseCode: string;
    responseMessage: string;
    amount: number | undefined;
    paxPaymentResponse: PaxPaymentResponse | undefined;
    paxBatchResponse: PaxBatchResponse | undefined;

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
            const result = new PaxResponse({
                status: status,
                command: command,
                version: version,
                responseCode: responseCode,
                responseMessage: responseMessage,
            });
            if (command === PaxResponse.COMMAND_TYPE_PAYMENT && fields.length >= 14) {
                result.paxPaymentResponse = PaxPaymentResponse.fromList(fields);
            } else if (command === PaxResponse.COMMAND_TYPE_BATCH && fields.length >= 12) {
                result.paxBatchResponse = PaxBatchResponse.fromList(fields);
            }
            console.log({parseResponse: result});
            return result;
        }
        return null;
    }

    extraData() {
        if (this.command === PaxResponse.COMMAND_TYPE_PAYMENT && this.paxPaymentResponse != null) {
            return this.paxPaymentResponse.toJson();
        } else if (this.command === PaxResponse.COMMAND_TYPE_BATCH && this.paxBatchResponse != null) {
            return this.paxBatchResponse.toJson();
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
            'amount': this.amount,
            'extra_data': this.extraData()
        }
    }
}

class PaxResponseCode {
}
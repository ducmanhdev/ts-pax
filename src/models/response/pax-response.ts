import PaxBatchResponse from "./pax-batch-response";
import PaxPaymentResponse from "./pax-payment-response";

export default class PaxResponse {
    static COMMAND_TYPE_PAYMENT = "T01";
    static COMMAND_TYPE_BATCH = "B01";

    status: string;
    command: string;
    version: string;
    responseCode: string;
    responseMessage: string;
    amount: number;
    paxPaymentResponse: PaxPaymentResponse;
    paxBatchResponse: PaxBatchResponse;

    constructor({
                    status,
                    command,
                    version,
                    responseCode,
                    responseMessage
                }) {
        this.status = status;
        this.command = command;
        this.version = version;
        this.responseCode = responseCode;
        this.responseMessage = responseMessage;
    }

    static fromString(res: string) {
        const fields = res.split(String.fromCharCode(28));
        if (fields.length >= 5) {
            const status = fields[0];
            const command = fields[1];
            const version = fields[2];
            const responseCode = fields[3];
            const responseMessage = fields[4];
            const result = new PaxResponse({
                status: status,
                command: command,
                version: version,
                responseCode: responseCode,
                responseMessage: responseMessage,
            });
            // COMMAND PAX PAYMENT
            if (
                fields.length === 14 &&
                command === PaxResponse.COMMAND_TYPE_PAYMENT
            ) {
                const dataAmount = fields[7].split(String.fromCharCode(31));
                result.paxPaymentResponse = PaxPaymentResponse.fromList(fields);
                result.amount = parseInt(dataAmount[0]);
            } else if (
                fields.length === 12 &&
                command === PaxResponse.COMMAND_TYPE_BATCH) {
                result.paxBatchResponse = PaxBatchResponse.fromList(fields);
            }
            // COMMAND PAX BATCH
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

class PaxResponseCode {}
import BatchCount from "./batch-count";
import BatchAmount from "./batch-amount";
import HostInformation from "./host-information";

type PaxBatchResponseParams = {
    message: HostInformation;
    messageRaw: string;
    batchCount: BatchCount;
    batchCountRaw: string[];
    batchAmount: BatchAmount;
    batchAmountRaw: string[];
    timestamp: string;
    tid: string;
    mid: string;
}

export default class PaxBatchResponse {
    message;
    messageRaw;
    batchCount;
    batchCountRaw;
    batchAmount;
    batchAmountRaw;
    // Timestamp with format: YYYYMMDDhhmmss
    timestamp;
    tid;
    mid;

    constructor({
                    messageRaw,
                    message,
                    batchCount,
                    batchCountRaw,
                    batchAmount,
                    batchAmountRaw,
                    timestamp,
                    tid,
                    mid,
                }: PaxBatchResponseParams) {
        this.messageRaw = messageRaw;
        this.message = message;
        this.batchCountRaw = batchCountRaw
        this.batchCount = batchCount;
        this.batchAmountRaw = batchAmountRaw;
        this.batchAmount = batchAmount;
        this.timestamp = timestamp;
        this.tid = tid;
        this.mid = mid;
    }

    static fromList(fields: any[]) {
        return new PaxBatchResponse({
            messageRaw: fields[6],
            message: HostInformation.fromList(fields[6]),
            batchCountRaw: fields[7],
            batchCount: BatchCount.fromString(fields[7]),
            batchAmountRaw: fields[8],
            batchAmount: BatchAmount.fromString(fields[8]),
            timestamp: fields[9],
            tid: fields[10],
            mid: fields[11]
        });
    }

    toJson() {
        return {
            'messageRaw': this.messageRaw,
            'message': this.message,
            'batchCount': this.batchCount,
            'batchCountRaw': this.batchCountRaw,
            'batchAmount': this.batchAmount,
            'batchAmountRaw': this.batchAmountRaw,
            'timestamp': this.timestamp,
            'mid': this.mid,
            'tid': this.tid
        }
    }
}
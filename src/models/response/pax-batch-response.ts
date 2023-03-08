import BatchCount from "./batch-count";
import BatchAmount from "./batch-amount";

type PaxBatchResponseParams = {
    messageRaw: string;
    batchCount: BatchCount;
    batchCountRaw: any;
    batchAmount: BatchAmount;
    batchAmountRaw: any;
    timestamp: string;
    tid: string;
    mid: string;
}

export default class PaxBatchResponse {
    messageRaw: string;
    batchCount: BatchCount;
    batchCountRaw: [];
    batchAmount: BatchAmount;
    batchAmountRaw: [];
    // Timestamp with format: YYYYMMDDhhmmss
    timestamp: string;
    tid: string;
    mid: string;

    constructor({
                    messageRaw,
                    batchCount,
                    batchCountRaw,
                    batchAmount,
                    batchAmountRaw,
                    timestamp,
                    tid,
                    mid,
                }: PaxBatchResponseParams) {
        this.messageRaw = messageRaw;
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
            batchCountRaw: fields[7],
            batchCount: BatchCount.fromList(fields[7]),
            batchAmountRaw: fields[8],
            batchAmount: BatchAmount.fromList(fields[8]),
            timestamp: fields[9],
            tid: fields[10],
            mid: fields[11]
        });
    }

    toJson() {
        return {
            'messageRaw': this.messageRaw,
            'batchCount': this.batchCount,
            'batchAmount': this.batchAmount,
            'timestamp': this.timestamp,
            'mid': this.mid,
            'tid': this.tid
        }
    }
}
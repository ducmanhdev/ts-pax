import BatchCount from "./batch-count";
import BatchAmount from "./batch-amount";

type PaxBatchResponseParams = {
    messageRaw: string;
    batchCount: BatchCount;
    batchAmount: BatchAmount;
    timestamp: string;
    tid: string;
    mid: string;
}

export default class PaxBatchResponse {
    messageRaw: string;
    batchCount: BatchCount;
    batchAmount: BatchAmount;
    // Timestamp with format: YYYYMMDDhhmmss
    timestamp: string;
    tid: string;
    mid: string;

    constructor({
                    messageRaw,
                    batchCount,
                    batchAmount,
                    timestamp,
                    tid,
                    mid,
                }: PaxBatchResponseParams) {
        this.messageRaw = messageRaw;
        this.batchCount = batchCount;
        this.batchAmount = batchAmount;
        this.timestamp = timestamp;
        this.tid = tid;
        this.mid = mid;
    }

    static fromList(data: any) {
        return new PaxBatchResponse({
            messageRaw: data[5]!,
            batchCount: BatchCount.fromList(data[6]!),
            batchAmount: BatchAmount.fromList(data[7]!),
            timestamp: data[8]!,
            tid: data[9]!,
            mid: data[10]!
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
import BatchCount from "./batch-count";
import BatchAmount from "./batch-amount";

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
                }) {
        this.messageRaw = messageRaw;
        this.batchCount = batchCount;
        this.batchAmount = batchAmount;
        this.timestamp = timestamp;
        this.tid = tid;
        this.mid = mid;
    }

    static fromList(data: string[]) {
        //0B011.40000000OKSUCCESS14=0=0=0=0=0=0-2601=0=0=0=0=0=020201118205829074719626549662
        // [0, B01, 1.40, 000000, OK, SUCCESS1, 1=0=0=0=0=0=0, 4320=0=0=0=0=0=0, 20201118211603, 07471962, 6549662, ]
        //print(data);
        return new PaxBatchResponse({
            messageRaw: data[5],
            batchCount: BatchCount.fromString(data[6]),
            batchAmount: BatchAmount.fromString(data[7]),
            timestamp: data[8],
            tid: data[9],
            mid: data[10]
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
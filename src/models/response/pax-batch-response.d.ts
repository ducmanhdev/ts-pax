import BatchCount from "./batch-count";
import BatchAmount from "./batch-amount";
type PaxBatchResponseParams = {
    messageRaw: string;
    batchCount: BatchCount;
    batchAmount: BatchAmount;
    timestamp: string;
    tid: string;
    mid: string;
};
export default class PaxBatchResponse {
    messageRaw: string;
    batchCount: BatchCount;
    batchAmount: BatchAmount;
    timestamp: string;
    tid: string;
    mid: string;
    constructor({ messageRaw, batchCount, batchAmount, timestamp, tid, mid, }: PaxBatchResponseParams);
    static fromList(data: string[]): PaxBatchResponse;
    toJson(): {
        messageRaw: string;
        batchCount: BatchCount;
        batchAmount: BatchAmount;
        timestamp: string;
        mid: string;
        tid: string;
    };
}
export {};
//# sourceMappingURL=pax-batch-response.d.ts.map
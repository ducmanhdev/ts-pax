"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const batch_count_1 = __importDefault(require("./batch-count"));
const batch_amount_1 = __importDefault(require("./batch-amount"));
class PaxBatchResponse {
    constructor({ messageRaw, batchCount, batchAmount, timestamp, tid, mid, }) {
        this.messageRaw = messageRaw;
        this.batchCount = batchCount;
        this.batchAmount = batchAmount;
        this.timestamp = timestamp;
        this.tid = tid;
        this.mid = mid;
    }
    static fromList(data) {
        //0B011.40000000OKSUCCESS14=0=0=0=0=0=0-2601=0=0=0=0=0=020201118205829074719626549662
        // [0, B01, 1.40, 000000, OK, SUCCESS1, 1=0=0=0=0=0=0, 4320=0=0=0=0=0=0, 20201118211603, 07471962, 6549662, ]
        //print(data);
        return new PaxBatchResponse({
            messageRaw: data[5],
            batchCount: batch_count_1.default.fromString(data[6]),
            batchAmount: batch_amount_1.default.fromString(data[7]),
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
        };
    }
}
exports.default = PaxBatchResponse;

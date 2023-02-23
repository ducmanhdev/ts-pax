"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TraceInformation {
    constructor({ transactionNumber, referenceNumber, timeStamp, }) {
        this.transactionNumber = transactionNumber;
        this.referenceNumber = referenceNumber;
        this.timeStamp = timeStamp;
    }
    static fromString(res) {
        const fields = res.split(String.fromCharCode(31));
        return new TraceInformation({
            transactionNumber: fields[0],
            referenceNumber: fields[1],
            timeStamp: fields[2],
        });
    }
    toJson() {
        return {
            'transaction_number': this.transactionNumber,
            'reference_number': this.referenceNumber,
            'time_stamp': this.timeStamp
        };
    }
}
exports.default = TraceInformation;

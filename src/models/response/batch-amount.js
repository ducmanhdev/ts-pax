"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BatchAmount {
    constructor({ creditAmount, debitAmount, ebtAmount, giftAmount, loyaltyAmount, cashAmount, checkAmount, }) {
        this.creditAmount = creditAmount;
        this.debitAmount = debitAmount;
        this.ebtAmount = ebtAmount;
        this.giftAmount = giftAmount;
        this.loyaltyAmount = loyaltyAmount;
        this.cashAmount = cashAmount;
        this.checkAmount = checkAmount;
    }
    static fromString(res) {
        const fields = res.split("=");
        return new BatchAmount({
            creditAmount: fields[0],
            debitAmount: fields[1],
            ebtAmount: fields[2],
            giftAmount: fields[3],
            loyaltyAmount: fields[4],
            cashAmount: fields[5],
            checkAmount: fields[6],
        });
    }
    toJson() {
        return {
            'credit_amount': this.creditAmount,
            'debit_amount': this.debitAmount,
            'ebt_amount': this.ebtAmount,
            'gift_amount': this.giftAmount,
            'loyalty_amount': this.loyaltyAmount,
            'cash_amount': this.cashAmount,
            'check_amount': this.checkAmount,
        };
    }
}
exports.default = BatchAmount;

type BatchCountParams = {
    creditCount: string;
    debitCount: string;
    ebtCount: string;
    giftCount: string;
    loyaltyCount: string;
    cashCount: string;
    checkCount: string;
}

export default class BatchCount {
    creditCount;
    debitCount;
    ebtCount;
    giftCount;
    loyaltyCount;
    cashCount;
    checkCount;

    constructor({
                    creditCount,
                    debitCount,
                    ebtCount,
                    giftCount,
                    loyaltyCount,
                    cashCount,
                    checkCount,
                }: BatchCountParams) {
        this.creditCount = creditCount;
        this.debitCount = debitCount;
        this.ebtCount = ebtCount;
        this.giftCount = giftCount;
        this.loyaltyCount = loyaltyCount;
        this.cashCount = cashCount;
        this.checkCount = checkCount;
    }

    static fromList(fields: any[]) {
        return new BatchCount({
            creditCount: fields[0],
            debitCount: fields[1],
            ebtCount: fields[2],
            giftCount: fields[3],
            loyaltyCount: fields[4],
            cashCount: fields[5],
            checkCount: fields[6],
        });
    }

    static fromString(res: string) {
        const fields = res.split("=");
        return BatchCount.fromList(fields);
    }

    toJson() {
        return {
            'credit_count': this.creditCount,
            'debit_count': this.debitCount,
            'ebt_count': this.ebtCount,
            'gift_count': this.giftCount,
            'loyalty_count': this.loyaltyCount,
            'cash_count': this.cashCount,
            'check_count': this.checkCount,
        }
    }
}
type BatchCountParams = {
    creditCount: string;
    debitCount: string;
    ebtCount: string;
    giftCount: string;
    loyaltyCount: string;
    cashCount: string;
    checkCount: string;
};
export default class BatchCount {
    creditCount: string;
    debitCount: string;
    ebtCount: string;
    giftCount: string;
    loyaltyCount: string;
    cashCount: string;
    checkCount: string;
    constructor({ creditCount, debitCount, ebtCount, giftCount, loyaltyCount, cashCount, checkCount, }: BatchCountParams);
    static fromString(res: string): BatchCount;
    toJson(): {
        credit_count: string;
        debit_count: string;
        ebt_count: string;
        gift_count: string;
        loyalty_count: string;
        cash_count: string;
        check_count: string;
    };
}
export {};
//# sourceMappingURL=batch-count.d.ts.map
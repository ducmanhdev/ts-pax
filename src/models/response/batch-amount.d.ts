type BatchAmountParams = {
    creditAmount: string;
    debitAmount: string;
    ebtAmount: string;
    giftAmount: string;
    loyaltyAmount: string;
    cashAmount: string;
    checkAmount: string;
};
export default class BatchAmount {
    creditAmount: string;
    debitAmount: string;
    ebtAmount: string;
    giftAmount: string;
    loyaltyAmount: string;
    cashAmount: string;
    checkAmount: string;
    constructor({ creditAmount, debitAmount, ebtAmount, giftAmount, loyaltyAmount, cashAmount, checkAmount, }: BatchAmountParams);
    static fromString(res: string): BatchAmount;
    toJson(): {
        credit_amount: string;
        debit_amount: string;
        ebt_amount: string;
        gift_amount: string;
        loyalty_amount: string;
        cash_amount: string;
        check_amount: string;
    };
}
export {};
//# sourceMappingURL=batch-amount.d.ts.map
type AmountInformationParams = {
    approveAmount: string;
    amountDue: string;
    tipAmount: string;
    cashBackAmount: string;
    merchantFee_surchargeFee: string;
    taxAmount: string;
    balance1: string;
    balance2: string;
};
export default class AmountInformation {
    approveAmount: string;
    amountDue: string;
    tipAmount: string;
    cashBackAmount: string;
    merchantFee_surchargeFee: string;
    taxAmount: string;
    balance1: string;
    balance2: string;
    constructor({ approveAmount, amountDue, tipAmount, cashBackAmount, merchantFee_surchargeFee, taxAmount, balance1, balance2, }: AmountInformationParams);
    static fromString(res: string): AmountInformation;
    toJson(): {
        approve_amount: string;
        amount_due: string;
        tip_amount: string;
        cash_back_amount: string;
        merchant_fee: string;
        tax_amount: string;
        balance1: string;
        balance2: string;
    };
}
export {};
//# sourceMappingURL=amount-information.d.ts.map
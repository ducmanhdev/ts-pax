type AmountInfoParams = {
    transactionAmount?: string;
    tipAmount?: string;
    cashBackAmount?: string;
    merchantFee?: string;
    taxAmount?: string;
    fuelAmount?: string;
};
export default class AmountInfo {
    transactionAmount: string;
    tipAmount: string;
    cashBackAmount: string;
    merchantFee: string;
    taxAmount: string;
    fuelAmount: string;
    constructor({ transactionAmount, tipAmount, cashBackAmount, merchantFee, taxAmount, fuelAmount }: AmountInfoParams);
    convertNumber(inValue: any): any;
    toListData(): any[];
}
export {};
//# sourceMappingURL=amount-info.d.ts.map
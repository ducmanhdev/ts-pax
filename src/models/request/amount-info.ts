type AmountInfoParams = Partial<{
    transactionAmount: string;
    tipAmount: string;
    cashBackAmount: string;
    merchantFee: string;
    taxAmount: string;
    fuelAmount: string;
}>

export default class AmountInfo {
    transactionAmount;
    tipAmount;
    cashBackAmount;
    merchantFee;
    taxAmount;
    fuelAmount;

    constructor({
                    transactionAmount = '',
                    tipAmount = '',
                    cashBackAmount = '',
                    merchantFee = '',
                    taxAmount = '',
                    fuelAmount = ''
                }: AmountInfoParams) {
        this.transactionAmount = transactionAmount;
        this.tipAmount = tipAmount;
        this.cashBackAmount = cashBackAmount;
        this.merchantFee = merchantFee;
        this.taxAmount = taxAmount;
        this.fuelAmount = fuelAmount;
    }

    convertNumber(inValue: any) {
        if (inValue.isEmpty) return '';
        if (inValue === '0') return '';
        return inValue.toString();
    }

    toListData() {
        return [
            this.convertNumber(this.transactionAmount),
            this.convertNumber(this.tipAmount),
            '',
            '',
            '',
            '',
        ];
    }
}
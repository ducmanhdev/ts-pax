export default class AmountInfo {
    transactionAmount: string;
    tipAmount: string;
    cashBackAmount: string;
    merchantFee: string;
    taxAmount: string;
    fuelAmount: string;

    constructor({
                    transactionAmount = '',
                    tipAmount = '',
                    cashBackAmount = '',
                    merchantFee = '',
                    taxAmount = '',
                    fuelAmount = ''
                }) {
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
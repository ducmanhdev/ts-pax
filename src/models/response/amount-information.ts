type AmountInformationParams = {
    approveAmount: string;
    amountDue: string;
    tipAmount: string;
    cashBackAmount: string;
    merchantFee_surchargeFee: string;
    taxAmount: string;
    balance1: string;
    balance2: string;
}

export default class AmountInformation {
    approveAmount: string;
    amountDue: string;
    tipAmount: string;
    cashBackAmount: string;
    merchantFee_surchargeFee: string;
    taxAmount: string;
    balance1: string;
    balance2: string;

    constructor({
                    approveAmount,
                    amountDue,
                    tipAmount,
                    cashBackAmount,
                    merchantFee_surchargeFee,
                    taxAmount,
                    balance1,
                    balance2,
                }: AmountInformationParams) {
        this.approveAmount = approveAmount;
        this.amountDue = amountDue;
        this.tipAmount = tipAmount;
        this.cashBackAmount = cashBackAmount;
        this.merchantFee_surchargeFee = merchantFee_surchargeFee;
        this.taxAmount = taxAmount;
        this.balance1 = balance1;
        this.balance2 = balance2;
    }

    static fromString(res: string) {
        const fields = res.split(String.fromCharCode(31));
        return new AmountInformation({
            approveAmount: fields[0]!,
            amountDue: fields[1]!,
            tipAmount: fields[2]!,
            cashBackAmount: fields[3]!,
            merchantFee_surchargeFee: fields[4]!,
            taxAmount: fields[5]!,
            balance1: fields[6]!,
            balance2: fields[7]!,
        });
    }

    toJson() {
        return {
            'approve_amount': this.approveAmount,
            'amount_due': this.amountDue,
            'tip_amount': this.tipAmount,
            'cash_back_amount': this.cashBackAmount,
            'merchant_fee': this.merchantFee_surchargeFee,
            'tax_amount': this.taxAmount,
            'balance1': this.balance1,
            'balance2': this.balance2,
        }
    }
}
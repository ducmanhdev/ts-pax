type AccountInformationParams = {
    account: string;
    entryMode: string;
    expiryDate: string;
    ebtType: string;
    voucherNumber: string;
    newAccountNo: string;
    cardType: string;
    cardHolder: string;
    cvdApprovalCode: string;
    cvdMessage: string;
    cardPresentIndicator: string;
}

export default class AccountInformation {
    account: string;
    entryMode: string;
    expiryDate: string;
    ebtType: string;
    voucherNumber: string;
    newAccountNo: string;
    cardType: string;
    cardHolder: string;
    cvdApprovalCode: string;
    cvdMessage: string;
    cardPresentIndicator: string;

    constructor({
                    account,
                    entryMode,
                    expiryDate,
                    ebtType,
                    voucherNumber,
                    newAccountNo,
                    cardType,
                    cardHolder,
                    cvdApprovalCode,
                    cvdMessage,
                    cardPresentIndicator,
                }: AccountInformationParams) {
        this.account = account;
        this.entryMode = entryMode;
        this.expiryDate = expiryDate;
        this.ebtType = ebtType;
        this.voucherNumber = voucherNumber;
        this.newAccountNo = newAccountNo;
        this.cardType = cardType;
        this.cardHolder = cardHolder;
        this.cvdApprovalCode = cvdApprovalCode;
        this.cvdMessage = cvdMessage;
        this.cardPresentIndicator = cardPresentIndicator;
    }

    static fromList(fields: any[]) {
        return new AccountInformation({
            account: fields[0],
            entryMode: fields[1],
            expiryDate: fields[2],
            ebtType: fields[3],
            voucherNumber: fields[4],
            newAccountNo: fields[5],
            cardType: fields[6],
            cardHolder: fields[7],
            cvdApprovalCode: fields[8],
            cvdMessage: fields[9],
            cardPresentIndicator: fields[10],
        });
    }

    static fromString(res: string) {
        const fields = res.split(String.fromCharCode(31));
        return AccountInformation.fromList(fields);
    }

    toJson() {
        return {
            'account': this.account,
            'entry_mode': this.entryMode,
            'expiry_date': this.expiryDate,
            'ebt_type': this.ebtType,
            'voucher_number': this.voucherNumber,
            'new_account_no': this.newAccountNo,
            'card_type': this.cardType,
            'card_holder': this.cardHolder,
            'cvd_approval_code': this.cvdApprovalCode,
            'cvd_message': this.cvdMessage,
            'card_present_indicator': this.cardPresentIndicator,
        }
    }
}
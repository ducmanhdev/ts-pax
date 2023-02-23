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
};
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
    constructor({ account, entryMode, expiryDate, ebtType, voucherNumber, newAccountNo, cardType, cardHolder, cvdApprovalCode, cvdMessage, cardPresentIndicator, }: AccountInformationParams);
    static fromString(res: string): AccountInformation;
    toJson(): {
        account: string;
        entry_mode: string;
        expiry_date: string;
        ebt_type: string;
        voucher_number: string;
        new_account_no: string;
        card_type: string;
        card_holder: string;
        cvd_approval_code: string;
        cvd_message: string;
        card_present_indicator: string;
    };
}
export {};
//# sourceMappingURL=account-information.d.ts.map
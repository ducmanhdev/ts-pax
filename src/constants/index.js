"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENTRY_MODE = exports.PAYMENT_TRANS_TYPE = exports.PAX_EDC_TYPE = exports.REPORT_TRAN_TYPE = exports.PAX_CARD_TYPE = void 0;
exports.PAX_CARD_TYPE = {
    ALL: "00",
    VISA: "01",
    MASTERCARD: "02",
    AMEX: "03",
    DISCOVER: "04",
    DINERCLUB: "05",
    ENROUTE: "06",
    JCB: "07",
    REVOLUTIONCARD: "08",
    OTHER: "09",
};
exports.REPORT_TRAN_TYPE = {
    LOCALTOTALREPORT: "R01",
    LOCALDETAILREPORT: "R02",
    LOCALFAILEDREPORT: "R03",
    HOSTREPORT: "R04",
    HISTORYREPORT: "R05",
    SAFSUMMARYREPORT: "R06",
};
exports.PAX_EDC_TYPE = {
    ALL: "00",
    CREDIT: "01",
    DEBIT: "02",
    CHECK: "03",
    EBT: "04",
    GIFT: "05",
    LOYALTY: "06",
    CASH: "07",
};
exports.PAYMENT_TRANS_TYPE = {
    TRAN_TYPE_MENU: '00',
    TRAN_TYPE_SALE: '01',
    TRAN_TYPE_RETURN: '02',
    TRAN_TYPE_AUTH: '03',
    TRAN_TYPE_POST_AUTH: '04',
    TRAN_TYPE_FORCED: '05',
    TRAN_TYPE_ADJUST: '06',
    TRAN_TYPE_VOID: '16',
    TRAN_TYPE_V_SALE: '17',
    TRAN_TYPE_V_RETURN: '18',
    TRAN_TYPE_V_AUTH: '19',
    TRAN_TYPE_V_POST: '20',
    TRAN_TYPE_V_FRCD: '21',
};
exports.ENTRY_MODE = {
    PAX_ENTRY_MODE_MANUAL: "0",
    PAX_ENTRY_MODE_SWIPE: "1",
    PAX_ENTRY_MODE_CONTACT_LESS: "2",
    PAX_ENTRY_MODE_SCANNER: "3",
    PAX_ENTRY_MODE_CHIP: "4",
    PAX_ENTRY_MODE_CHIP_FALL_BACK_SWIPE: "5",
};

export const CARD_TYPE = {
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
}

export const REPORT_TRAN_TYPE = {
    LOCALTOTALREPORT: "R00",
    LOCALDETAILREPORT: "R02",
    LOCALFAILEDREPORT: "R03",
    HOSTREPORT: "R04",
    HISTORYREPORT: "R05",
    SAFSUMMARYREPORT: "R06",
}

export const EDC_TYPE = {
    ALL: "00",
    CREDIT: "01",
    DEBIT: "02",
    CHECK: "03",
    EBT: "04",
    GIFT: "05",
    LOYALTY: "06",
    CASH: "07",
}

export const TRANS_TYPE = {
    MENU: '00',
    AUTH: '01',
    SALE: '02',
    RETURN: '03',
    POST_AUTH: '04',
    FORCED: '05',
    ADJUST: '06',
    VOID: '16',
    VOID_SALE: '17',
    VOID_RETURN: '18',
    VOID_AUTH: '19',
    VOID_POST: '20',
    VOID_FRCD: '21',
}

export const ENTRY_MODE = {
    MANUAL: "00",
    SWIPE: "01",
    CONTACT_LESS: "02",
    SCANNER: "03",
    CHIP: "04",
    CHIP_FALL_BACK_SWIPE: "05",
}
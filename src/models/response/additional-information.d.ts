type AdditionalInformationParams = {
    edcType: string;
    cardBin: string;
    programType: string;
    sn: string;
    tc: string;
    tvr: string;
    aid: string;
    tsi: string;
    atc: string;
    applab: string;
    iad: string;
    arc: string;
    cid: string;
    cvm: string;
};
export default class AdditionalInformation {
    edcType: string;
    cardBin: string;
    programType: string;
    sn: string;
    tc: string;
    tvr: string;
    aid: string;
    tsi: string;
    atc: string;
    applab: string;
    iad: string;
    arc: string;
    cid: string;
    cvm: string;
    constructor({ edcType, cardBin, programType, sn, tc, tvr, aid, tsi, atc, applab, iad, arc, cid, cvm, }: AdditionalInformationParams);
    static fromString(res: string): AdditionalInformation;
    toJson(): {
        edc_type: string;
        card_bin: string;
        program_type: string;
        sn: string;
        tc: string;
        tvr: string;
        aid: string;
        tsi: string;
        atc: string;
        app_lab: string;
        iad: string;
        arc: string;
        cid: string;
        cvm: string;
    };
}
export {};
//# sourceMappingURL=additional-information.d.ts.map
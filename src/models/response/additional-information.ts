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
}

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

    constructor({
                    edcType,
                    cardBin,
                    programType,
                    sn,
                    tc,
                    tvr,
                    aid,
                    tsi,
                    atc,
                    applab,
                    iad,
                    arc,
                    cid,
                    cvm,
                }: AdditionalInformationParams) {
        this.edcType = edcType;
        this.cardBin = cardBin;
        this.programType = programType;
        this.sn = sn;
        this.tc = tc;
        this.tvr = tvr;
        this.aid = aid;
        this.tsi = tsi;
        this.atc = atc;
        this.applab = applab;
        this.iad = iad;
        this.arc = arc;
        this.cid = cid;
        this.cvm = cvm;
    }

    static fromList(fields: string[]) {
        return new AdditionalInformation({
            edcType: fields[0]!,
            cardBin: fields[1]!,
            programType: fields[2]!,
            sn: fields[3]!,
            tc: fields[4]!,
            tvr: fields[5]!,
            aid: fields[6]!,
            tsi: fields[7]!,
            atc: fields[8]!,
            applab: fields[9]!,
            iad: fields[10]!,
            arc: fields[11]!,
            cid: fields[12]!,
            cvm: fields[13]!,
        });
    }

    static fromString(res: string) {
        const fields = res.split(String.fromCharCode(31));
        return AdditionalInformation.fromList(fields);
    }

    toJson() {
        return {
            'edc_type': this.edcType,
            'card_bin': this.cardBin,
            'program_type': this.programType,
            'sn': this.sn,
            'tc': this.tc,
            'tvr': this.tvr,
            'aid': this.aid,
            'tsi': this.tsi,
            'atc': this.atc,
            'app_lab': this.applab,
            'iad': this.iad,
            'arc': this.arc,
            'cid': this.cid,
            'cvm': this.cvm,
        }
    }
}
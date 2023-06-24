import {convertSigToPic} from "../../utils";

type PaxShowTextBoxResponseParams = {
    signStatus: string;
    signImage: string;
}

export default class PaxShowTextBoxResponse {
    signStatus;
    signImage;
    constructor({signStatus, signImage}: PaxShowTextBoxResponseParams) {
        this.signStatus = signStatus;
        this.signImage = signImage;
    }

    static fromList(fields: any[]) {
        return new PaxShowTextBoxResponse({
            signStatus: fields[7],
            signImage: convertSigToPic(fields[8]),
        });
    }

    toJson() {
        return {
            'signStatus': this.signStatus,
            'signImage': this.signImage,
        }
    }
}
import {convertSigToPic} from "../../utils";

type PaxShowTextBoxResponseParams = {
    buttonNum: string;
    signStatus: string;
    signImage: string;
}

export default class PaxShowTextBoxResponse {
    buttonNum
    signStatus;
    signImage;
    constructor({buttonNum, signStatus, signImage}: PaxShowTextBoxResponseParams) {
        this.buttonNum = buttonNum;
        this.signStatus = signStatus;
        this.signImage = signImage;
    }

    static fromList(fields: any[]) {
        return new PaxShowTextBoxResponse({
            buttonNum: fields[6],
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
import {ContinuousScreen, EnableHardKey, HardKeys, SignatureBox, TimeOut} from "../../types";

export type ShowTextBoxRequestParams = Partial<{
    title: string,
    text: string,
    button1: string,
    buttonColor1: string,
    button2: string,
    buttonColor2: string,
    button3: string,
    buttonColor3: string,
    buttonKey1: HardKeys
    buttonKey2: HardKeys
    buttonKey3: HardKeys
    enableHardKey: EnableHardKey,
    hardKeyList: string,
    signatureBox: SignatureBox,
    saveSigPath: string,
    timeout: TimeOut,
    continuousScreen: ContinuousScreen,
}>

export default class ShowTextBoxRequest {
    title;
    text;
    button1;
    buttonColor1;
    button2;
    buttonColor2;
    button3;
    buttonColor3;
    buttonKey1;
    buttonKey2;
    buttonKey3;
    enableHardKey;
    hardKeyList;
    signatureBox;
    saveSigPath;
    timeout;
    continuousScreen;

    constructor({
                    title,
                    text,
                    button1,
                    buttonColor1,
                    button2,
                    buttonColor2,
                    button3,
                    buttonColor3,
                    timeout = '',
                    buttonKey1,
                    buttonKey2,
                    buttonKey3,
                    enableHardKey,
                    hardKeyList,
                    signatureBox = 0,
                    saveSigPath,
                    continuousScreen = 0,
                }: ShowTextBoxRequestParams) {
        this.title = title;
        this.text = text;
        this.button1 = button1;
        this.buttonColor1 = buttonColor1;
        this.button2 = button2;
        this.buttonColor2 = buttonColor2;
        this.button3 = button3;
        this.buttonColor3 = buttonColor3;
        this.timeout = timeout;
        this.buttonKey1 = buttonKey1;
        this.buttonKey2 = buttonKey2;
        this.buttonKey3 = buttonKey3;
        this.enableHardKey = enableHardKey;
        this.hardKeyList = hardKeyList;
        this.signatureBox = signatureBox;
        this.saveSigPath = saveSigPath;
        this.continuousScreen = continuousScreen;
    }

    toListData() {
        return [
            this.title,
            this.text,
            this.button1,
            this.buttonColor1,
            this.button2,
            this.buttonColor2,
            this.button3,
            this.buttonColor3,
            this.timeout,
            this.buttonKey1,
            this.buttonKey2,
            this.buttonKey3,
            this.enableHardKey,
            this.hardKeyList,
            this.signatureBox,
            // this.saveSigPath,
            this.continuousScreen,
        ];
    }
}
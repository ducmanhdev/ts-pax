import {ContinuousScreen, TimeOut} from "../../types";

export type ShowDialogRequestParams = Partial<{
    title: string,
    button1: string,
    button2: string,
    button3: string,
    button4: string,
    timeout: TimeOut,
    continuousScreen: ContinuousScreen,
}>

export default class ShowDialogRequest {
    title;
    button1;
    button2;
    button3;
    button4;
    timeout
    continuousScreen;

    constructor({
                    title = '',
                    button1 = '',
                    button2 = '',
                    button3 = '',
                    button4 = '',
                    timeout = 100,
                    continuousScreen = 0
                }: ShowDialogRequestParams) {
        this.title = title;
        this.button1 = button1;
        this.button2 = button2;
        this.button3 = button3;
        this.button4 = button4;
        this.timeout = timeout;
        this.continuousScreen = continuousScreen
    }

    toListData() {
        return [
            this.title,
            this.button1,
            this.button2,
            this.button3,
            this.button4,
            this.timeout,
            this.continuousScreen,
        ];
    }
}
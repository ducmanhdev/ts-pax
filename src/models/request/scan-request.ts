import {Reader, TimeOut} from "../../types";

export type ScanRequestParams = Partial<{
    reader: Reader,
    timeout: TimeOut,
}>

export default class ScanRequest {
    reader;
    timeout;

    constructor({
                    reader = 0,
                    timeout = '',
                }: ScanRequestParams) {
        this.reader = reader;
        this.timeout = timeout;
    }

    toListData() {
        return [
            this.reader,
            this.timeout,
        ];
    }
}
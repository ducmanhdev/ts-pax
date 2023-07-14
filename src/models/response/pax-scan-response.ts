type PaxScanResponseParams = {
    barcodeData: string;
    barcodeType: string;
}

export default class PaxScanResponse {
    barcodeData
    barcodeType;
    constructor({barcodeData, barcodeType}: PaxScanResponseParams) {
        this.barcodeData = barcodeData;
        this.barcodeType = barcodeType;
    }

    static fromList(fields: any[]) {
        return new PaxScanResponse({
            barcodeData: fields[6],
            barcodeType: fields[7],
        });
    }

    toJson() {
        return {
            'barcodeData': this.barcodeData,
            'barcodeType': this.barcodeType,
        }
    }
}
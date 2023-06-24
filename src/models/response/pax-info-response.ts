type PaxInfoResponseParams = {
    SN: string;
    ModelName: string;
    OSVersion: string;
    MacAddress: string;
    NumberOfLinesPerScreen: string;
    NumberOfCharsPerline: string;
    AdditionalInformation: string;
}

export default class PaxInfoResponse {
    SN;
    ModelName;
    OSVersion;
    MacAddress;
    NumberOfLinesPerScreen;
    NumberOfCharsPerline;
    AdditionalInformation;
    constructor({
                    SN,
                    ModelName,
                    OSVersion,
                    MacAddress,
                    NumberOfLinesPerScreen,
                    NumberOfCharsPerline,
                    AdditionalInformation,
                }: PaxInfoResponseParams) {
        this.SN = SN;
        this.ModelName = ModelName;
        this.OSVersion = OSVersion;
        this.MacAddress = MacAddress;
        this.NumberOfLinesPerScreen = NumberOfLinesPerScreen;
        this.NumberOfCharsPerline = NumberOfCharsPerline;
        this.AdditionalInformation = AdditionalInformation;
    }

    static fromList(fields: any[]) {
        return new PaxInfoResponse({
            SN: fields[6],
            ModelName: fields[7],
            OSVersion: fields[8],
            MacAddress: fields[9],
            NumberOfLinesPerScreen: fields[10],
            NumberOfCharsPerline: fields[11],
            AdditionalInformation: fields[12],
        });
    }

    toJson() {
        return {
            SN: this.SN,
        }
    }
}
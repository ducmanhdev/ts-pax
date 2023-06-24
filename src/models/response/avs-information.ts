type AvsInformationParams = {
    avsApprovalCode: string;
    avsMessage: string;
}

export default class AvsInformation {
    avsApprovalCode;
    avsMessage;

    constructor({
                    avsApprovalCode,
                    avsMessage,
                }: AvsInformationParams) {
        this.avsApprovalCode = avsApprovalCode;
        this.avsMessage = avsMessage
    }

    static fromList(fields: any[]) {
        return new AvsInformation({
            avsApprovalCode: fields[0],
            avsMessage: fields[1],
        });
    }

    static fromString(res: string) {
        const fields = res.split(String.fromCharCode(31));
        return AvsInformation.fromList(fields);
    }

    toJson() {
        return {
            'avs_approval_code': this.avsApprovalCode,
            'avs_message': this.avsMessage
        }
    }
}
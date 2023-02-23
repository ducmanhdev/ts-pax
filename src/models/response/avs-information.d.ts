type AvsInformationParams = {
    avsApprovalCode: string;
    avsMessage: string;
};
export default class AvsInformation {
    avsApprovalCode: string;
    avsMessage: string;
    constructor({ avsApprovalCode, avsMessage, }: AvsInformationParams);
    static fromString(res: string): AvsInformation;
    toJson(): {
        avs_approval_code: string;
        avs_message: string;
    };
}
export {};
//# sourceMappingURL=avs-information.d.ts.map
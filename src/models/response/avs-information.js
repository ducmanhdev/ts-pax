"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AvsInformation {
    constructor({ avsApprovalCode, avsMessage, }) {
        this.avsApprovalCode = avsApprovalCode;
        this.avsMessage = avsMessage;
    }
    static fromString(res) {
        const fields = res.split(String.fromCharCode(31));
        return new AvsInformation({
            avsApprovalCode: fields[0],
            avsMessage: fields[1],
        });
    }
    toJson() {
        return {
            'avs_approval_code': this.avsApprovalCode,
            'avs_message': this.avsMessage
        };
    }
}
exports.default = AvsInformation;

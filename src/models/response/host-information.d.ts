type HostInformationParams = {
    hostResponseCode: string;
    hostResponseMessage: string;
    authCode: string;
    hostReferenceNumber: string;
    traceNumber: string;
    batchNumber: string;
};
export default class HostInformation {
    hostResponseCode: string;
    hostResponseMessage: string;
    authCode: string;
    hostReferenceNumber: string;
    traceNumber: string;
    batchNumber: string;
    constructor({ hostResponseCode, hostResponseMessage, authCode, hostReferenceNumber, traceNumber, batchNumber, }: HostInformationParams);
    static fromString(res: string): HostInformation;
    toJson(): {
        host_response_code: string;
        host_response_message: string;
        auth_code: string;
        host_reference_number: string;
        trace_number: string;
        batch_number: string;
    };
}
export {};
//# sourceMappingURL=host-information.d.ts.map
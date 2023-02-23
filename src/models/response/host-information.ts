type HostInformationParams = {
    hostResponseCode: string;
    hostResponseMessage: string;
    authCode: string;
    hostReferenceNumber: string;
    traceNumber: string;
    batchNumber: string;
}

export default class HostInformation {
    hostResponseCode: string;
    hostResponseMessage: string;
    authCode: string;
    hostReferenceNumber: string;
    traceNumber: string;
    batchNumber: string;

    constructor({
                    hostResponseCode,
                    hostResponseMessage,
                    authCode,
                    hostReferenceNumber,
                    traceNumber,
                    batchNumber,
                }: HostInformationParams) {
        this.hostResponseCode = hostResponseCode;
        this.hostResponseMessage = hostResponseMessage;
        this.authCode = authCode;
        this.hostReferenceNumber = hostReferenceNumber;
        this.traceNumber = traceNumber;
        this.batchNumber = batchNumber;
    }

    static fromString(res: string) {
        const fields = res.split(String.fromCharCode(31));
        return new HostInformation({
            hostResponseCode: fields[0]!,
            hostResponseMessage: fields[1]!,
            authCode: fields[2]!,
            hostReferenceNumber: fields[3]!,
            traceNumber: fields[4]!,
            batchNumber: fields[5]!,
        });
    }

    toJson() {
        return {
            'host_response_code': this.hostResponseCode,
            'host_response_message': this.hostResponseMessage,
            'auth_code': this.authCode,
            'host_reference_number': this.hostReferenceNumber,
            'trace_number': this.traceNumber,
            'batch_number': this.batchNumber,
        }
    }
}
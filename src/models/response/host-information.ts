type HostInformationParams = {
    hostResponseCode: string;
    hostResponseMessage: string;
    authCode: string;
    hostReferenceNumber: string;
    traceNumber: string;
    batchNumber: string;
}

export default class HostInformation {
    hostResponseCode;
    hostResponseMessage;
    authCode;
    hostReferenceNumber;
    traceNumber;
    batchNumber;

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

    static fromList(fields: any[]) {
        return new HostInformation({
            hostResponseCode: fields[0],
            hostResponseMessage: fields[1],
            authCode: fields[2],
            hostReferenceNumber: fields[3],
            traceNumber: fields[4],
            batchNumber: fields[5],
        });
    }

    static fromString(res: string) {
        const fields = res.split(String.fromCharCode(31));
        return HostInformation.fromList(fields);
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
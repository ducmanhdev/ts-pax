export const hexToBase64 = (str: any) => {
    return window.btoa(String.fromCharCode.apply(null,
        str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
}

export const base64ToHex = (str: any) => {
    const hex: any[] = [];
    const bin = atob(str.replace(/[ \r\n]+$/, ""))
    for (let i = 0; i < bin.length; ++i) {
        let tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) tmp = "0" + tmp;
        hex[hex.length] = tmp;
    }
    return hex.join(" ");
};

export const stringToHex = (response: any) => {
    let responseHex = "";
    for (let i = 0; i < response.length; i++) {
        if (responseHex === "") responseHex = response.charCodeAt(i).toString(16).length < 2 ? '0' + response.charCodeAt(i).toString(16) : response.charCodeAt(i).toString(16);
        else responseHex += response.charCodeAt(i).toString(16).length < 2 ? " " + '0' + response.charCodeAt(i).toString(16) : " " + response.charCodeAt(i).toString(16);
    }
    return responseHex;
};

export const hexToString = (response: any) => {
    let responseHex = "";
    let arr = response.split(" ");
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "") continue;
        responseHex += String.fromCharCode(parseInt(arr[i], 16));
    }
    return responseHex;
};

export const getLRC = (params: string) => {
    let lrc = 0;
    for (let i = 1; i < params.length; i++) {
        let type_of = typeof (params[i]);
        if (type_of === "string") {
            let element = params[i]!.split("");
            for (let ii = 0; ii < element.length; ii++) {
                lrc ^= element[ii]!.charCodeAt(0);
            }
        } else {
            lrc ^= params[i] as any;
        }
    }
    return (lrc > 0) ? String.fromCharCode(lrc) : "0";
};

export const strEncodeUTF16 = (str: string) => {
    const strLength = str.length;
    const buf = new ArrayBuffer(strLength * 2);
    let bufView = new Uint16Array(buf);
    for (let i = 0; i < strLength; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return bufView;
}
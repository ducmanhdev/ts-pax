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
        if (responseHex === "") {
            responseHex = response.charCodeAt(i).toString(16).length < 2 ? '0' + response.charCodeAt(i).toString(16) : response.charCodeAt(i).toString(16);
        } else {
            responseHex += response.charCodeAt(i).toString(16).length < 2 ? " " + '0' + response.charCodeAt(i).toString(16) : " " + response.charCodeAt(i).toString(16);
        }
    }
    return responseHex;
};

export const hexToString = (response: any) => {
    let responseHex = "";
    const arr = response.split(" ");
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "") continue;
        responseHex += String.fromCharCode(parseInt(arr[i], 16));
    }
    return responseHex;
};

export const getLRC = (params: string) => {
    let lrc = 0;
    for (let i = 1; i < params.length; i++) {
        const type_of = typeof (params[i]);
        if (type_of == "string") {
            const element = params[i]!.split("");
            for (let ii = 0; ii < element.length; ii++) {
                lrc ^= element[ii]!.charCodeAt(0);
            }
        } else {
            lrc ^= params[i] as any;
        }
    }
    return (lrc > 0) ? String.fromCharCode(lrc) : 0;
};

export const trim = (str: string = '', chars: any) => {
    if (chars) return str;
    const pattern = RegExp(`^[${chars}]+|[${chars}]+\$`, 'gi');
    return str.replace(pattern, '');
}

export const convertSigToPic = (text: string) => {
    if (!text) return '';

    const array = text.split('^');
    const num = 10;
    let num2 = 0;
    const arrayList = [];
    const arrayList2 = [];

    for (let i = 0; i < array.length - 1; i++) {
        try {
            const text2: any = array[i];
            const text3: any = text2;
            const num3 = text2.indexOf(",");
            const s = text3.substring(num3 + 1);

            if (parseInt(s) === 65535) {
                num2 = 1;
                continue;
            }

            const s2 = text3.substring(0, num3);
            arrayList2.push(parseInt(s));
            arrayList.push(parseInt(s2));
        } catch (error: any) {
            console.log(error.message);
        }
    }

    if (arrayList.length === 0) {
        if (array.length - 1 > 0) {
            for (let i = 0; i < array.length - 1; i++) {
                arrayList2.push(null);
                arrayList.push(null);
            }
        }
    }

    arrayList.sort((a: any, b: any) => a - b);
    arrayList2.sort((a: any, b: any) => a - b);
    const num5 = parseInt(arrayList[0] as any);
    const num6 = parseInt(arrayList2[0] as any);
    const num7 = parseInt(arrayList[arrayList.length - 1] as any + (1 - parseInt(arrayList[0] as any)));
    // const num8 = parseInt(arrayList2[arrayList2.length - 1] as any + (1 - parseInt(arrayList2[0] as any)));
    const num9 = num * 2;

    const canvas = document.createElement('canvas');
    canvas.width = num9 + num7;
    canvas.height = num9 + num7;
    const ctx: any = canvas.getContext('2d');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let j = 0; j < array.length - 1; j++) {
        try {
            const text4: any = array[j];
            const text3: any = text4;
            const num10: any = text4.indexOf(",");
            const s = text3.substring(num10 + 1);
            const s2 = text3.substring(0, num10);

            if (parseInt(s) !== 65535) {
                ctx.fillStyle = '#000000';
                ctx.fillRect(parseInt(s2) + (num - num5), parseInt(s) + (num - num6), 1, 1);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }

    if (num2 === 1) {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;

        for (let k = 1; k < array.length - 1; k++) {
            try {
                const text5: any = array[k - 1];
                const text3: any = text5;
                const num11 = text5.indexOf(",");
                const s = text3.substring(num11 + 1);
                const s2 = text3.substring(0, num11);

                if (parseInt(s) !== 65535) {
                    const num12 = num - num5;
                    const x1 = parseInt(s2) + num12;
                    const num13 = num - num6;
                    const y1 = parseInt(s) + num13;

                    const text6: any = array[k];
                    const text3: any = text6;
                    const num11 = text6.indexOf(",");
                    const ss = text3.substring(num11 + 1);
                    const s2s = text3.substring(0, num11);

                    if (parseInt(ss) !== 65535) {
                        const x2 = parseInt(s2s) + num12;
                        const y2 = parseInt(ss) + num13;

                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();
                    }
                }
            } catch (error: any) {
                console.log(error.message);
            }
        }
    }

    const image = new Image();
    image.src = canvas.toDataURL();
    return image.src.replace(/^data:image\/bmp;base64,/, '');
}

export const parseJSON = (data: any) => {
    try {
        return JSON.parse(data)
    } catch (error) {
        return data
    }
}
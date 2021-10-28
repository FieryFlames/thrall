import { Packet } from "./packet.js";

class InboundPacket extends Packet {
    constructor(responseType) {
        super(8);
        this.responseType = responseType;
    }

    UnpackInteger(offset) {
        var value = this.data[offset] | (this.data[offset + 1] << 8) |
            (this.data[offset + 2] << 16) | (this.data[offset + 3] << 24);
        return value;
    }
}

class ResponsePacket extends InboundPacket {
    constructor(responseType) {
        super(responseType);
        this.dataSize = 4;
    }

    Unpack() {
        var recievedResponseType = this.UnpackInteger(0);
        if (recievedResponseType != this.responseType) {
            this.responseType = recievedResponseType;
            return false;
        }
        return true;
    }
}

export class SessionSetupResponse extends ResponsePacket {
    constructor() {
        super(0x64)
        this.result = null
    }

    Unpack() {
        if (!super.Unpack()) {
            return false;
        }
        this.result = this.UnpackInteger(this.dataSize);

        return true;

    }
}
export class EndSessionResponse extends ResponsePacket {
    constructor() {
        super(0x67)        
    }
}
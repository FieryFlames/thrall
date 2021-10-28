export class Packet {
    constructor(size) {
        this.size = size;
        this.data = new Uint8Array(size);
    }
    Buffer() {
        return this.data.buffer.slice(this.data.byteOffset, this.data.byteLength + this.data.byteOffset)
    }
}

class OutboundPacket extends Packet {
    constructor(size) {
        super(size);
    }

    PackInteger(offset, value) {
        this.data[offset] = value & 0x000000FF;
        this.data[offset + 1] = (value & 0x0000FF00) >> 8;
        this.data[offset + 2] = (value & 0x00FF0000) >> 16;
        this.data[offset + 3] = (value & 0xFF000000) >> 24;
    }
}

class ControlPacket extends OutboundPacket {
    constructor(controlType) {
        super(1024);
        this.controlType = controlType;
        this.dataSize = 4;
    }

    Pack() {
        this.PackInteger(0, this.controlType);
    }
}

class SessionSetupPacket extends ControlPacket {
    constructor(request) {
        super(0x64);
        this.request = request;
        this.dataSize = this.dataSize + 4;
    }

    Pack() {
        super.Pack();

        this.PackInteger(this.dataSize, this.request);
    }
}

export class BeginSessionPacket extends SessionSetupPacket {
    constructor() {
        super(0)
    }
}

export class EndSessionPacket extends ControlPacket {
    constructor(request) {
        super(0x67);
        this.request = request;

    }

    Pack() {
        super.Pack();

        this.PackInteger(this.dataSize, this.request);
    }
}
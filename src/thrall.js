export class OdinDevice {
    constructor() {
        this.device = null
        this.protocolInitalized = false
    }

    async _initalizeProtocol() {
        let probePacket = new TextEncoder('utf-8').encode("ODIN");
        await this.device.transferOut(2, probePacket);

        let response;
        let respPacket = await this.device.transferIn(1, 4);
        response = new TextDecoder().decode(respPacket.data);
        if (response === "LOKE") {
            this.protocolInitalized = true;
            return true;
        }
    }

    async _validateAndConnectDevice() {
        await this.device.open();
        // Opportunistically reset to fix issues on some platforms
        try {
            await this.device.reset();
        } catch (error) {
            /* Failed = doesn't support reset */
        }
        await this.device.selectConfiguration(1);
        await this.device.claimInterface(1);
        await this.device.selectAlternateInterface(1, 0);

        await this._initalizeProtocol();
    }

    async connect() {
        let devices = await navigator.usb.getDevices();
        if (devices.length === 1) {
            this.device = devices[0];
        } else {
            // If multiple paired devices are connected, request the user to
            // select a specific one to reduce ambiguity. This is also necessary
            // if no devices are already paired, i.e. first use.
            this.device = await navigator.usb.requestDevice({
                filters: [
                    {
                        vendorId: 0x04e8
                    },
                ],
            })
        }

        await this._validateAndConnectDevice();
    }

    async sendPacket(packet) {
        packet.Pack()
        await this.device.transferOut(2, packet.Buffer());
    }
    async receivePacket(packet) {
        let responsePacket = await this.device.transferIn(1, packet.size);
        packet.data = new Uint8Array(responsePacket.data.buffer);
        return packet;
    }
}
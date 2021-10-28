import { OdinDevice } from "./thrall.js";
import { BeginSessionPacket, EndSessionPacket } from "./packet.js";
import { EndSessionResponse, SessionSetupResponse } from "./response.js";

let device = new OdinDevice();
window.device = device;

async function connectDevice() {
    let statusField = document.querySelector(".status-field");
    statusField.textContent = "Connecting...";

    try {
        await device.connect();
        statusField.textContent = "Connected";
    } catch (error) {
        statusField.textContent = `Failed to connect to device: ${error.message}`;
        return;
    }
}

async function beginSession() {
    await device.sendPacket(new BeginSessionPacket());
    var resp = await device.receivePacket(new SessionSetupResponse());
    resp.Unpack();
    console.log(resp);
}
async function endSession() {
    await device.sendPacket(new EndSessionPacket(1));
    var resp = await device.receivePacket(new EndSessionResponse());
    resp.Unpack();
    console.log(resp);
}

document.querySelector(".connect-btn").addEventListener("click", connectDevice);
document.querySelector(".begin-session").addEventListener("click", beginSession);
document.querySelector(".end-session").addEventListener("click", endSession);
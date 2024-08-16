"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const dotenv_1 = require("dotenv");
const fs_extra_1 = require("fs-extra");
// Local Only
(0, dotenv_1.config)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const wallet = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY || "");
        const encryptedJsonKey = yield wallet.encrypt(process.env.PRIVATE_KEY_PASSWORD || "");
        console.log(encryptedJsonKey);
        (0, fs_extra_1.writeFileSync)("./.encryptedKey.json", encryptedJsonKey);
    });
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.log(error);
    process.exit(1);
});

"use strict";
// Contract deployment on JS Runtime
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
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const provider = new ethers_1.ethers.JsonRpcProvider(process.env.RPC_URL);
        // This is the address that we sign out transactions through and also encrypt
        // const wallet = new ethers.Wallet(String(process.env.PRIVATE_KEY), provider);
        const encryptedJson = (0, fs_extra_1.readFileSync)("./.encryptedKey.json", "utf-8");
        let wallet = yield ethers_1.ethers.Wallet.fromEncryptedJsonSync(encryptedJson, process.env.PRIVATE_KEY_PASSWORD || "");
        wallet = yield wallet.connect(provider);
        // extract abi to deploy, do it synchronously because we need to wait for it
        const abi = (0, fs_extra_1.readFileSync)("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
        const binary = (0, fs_extra_1.readFileSync)("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");
        // A contract factory is just an object used to deploy contracts
        const contractFactory = new ethers_1.ethers.ContractFactory(abi, binary, wallet);
        console.log("Deploying, please wait...");
        // We can add gasLimit, gasPrice below
        let contractTransaction = yield contractFactory.deploy();
        const contractTransactionReceipt = yield ((_a = contractTransaction
            .deploymentTransaction()) === null || _a === void 0 ? void 0 : _a.wait(1));
        const contract = new ethers_1.ethers.Contract((contractTransactionReceipt === null || contractTransactionReceipt === void 0 ? void 0 : contractTransactionReceipt.contractAddress) || "", abi, wallet);
        console.log(`Contract Address: ${contractTransactionReceipt === null || contractTransactionReceipt === void 0 ? void 0 : contractTransactionReceipt.contractAddress}`);
        console.log("Here is the transaction receipt");
        console.log(contractTransactionReceipt);
        const transactionRespnse = yield contract.store("7");
        const transactionReceipt = yield transactionRespnse.wait(1);
        console.log(transactionReceipt);
        const currentFavoriteNumber = yield contract.retrieve();
        console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);
    });
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.log(error);
    process.exit(1);
});

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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var dotenv_1 = require("dotenv");
var fs_extra_1 = require("fs-extra");
// Local
(0, dotenv_1.config)();
function main() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var provider, wallet, abi, binary, contractFactory, tx, transactionReceipt, contract, some, currentFavoriteNumber;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    provider = new ethers_1.ethers.JsonRpcProvider("http://127.0.0.1:7545");
                    wallet = new ethers_1.ethers.Wallet(process.env.WalletAddress || "", provider);
                    abi = (0, fs_extra_1.readFileSync)("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
                    binary = (0, fs_extra_1.readFileSync)("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");
                    contractFactory = new ethers_1.ethers.ContractFactory(abi, binary, wallet);
                    console.log("Deploying, please wait...");
                    return [4 /*yield*/, contractFactory.deploy()];
                case 1:
                    tx = _b.sent();
                    return [4 /*yield*/, ((_a = tx.deploymentTransaction()) === null || _a === void 0 ? void 0 : _a.wait(1))];
                case 2:
                    transactionReceipt = _b.sent();
                    contract = new ethers_1.ethers.Contract((transactionReceipt === null || transactionReceipt === void 0 ? void 0 : transactionReceipt.contractAddress) || "", abi, wallet);
                    // it is returned whenever a transaction is created
                    // console.log("Here is the deployment transaction");
                    // console.log(contract.deploymentTransaction());
                    // This is created only when block confirmation occurs (when we wait for transaction to finish)
                    console.log("Here is the transaction receipt");
                    console.log(transactionReceipt);
                    return [4 /*yield*/, contract.store(7)];
                case 3:
                    some = _b.sent();
                    return [4 /*yield*/, contract.retrieve()];
                case 4:
                    currentFavoriteNumber = _b.sent();
                    console.log("Current Favorite Number: ", currentFavoriteNumber.toString());
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return process.exit(0); })
    .catch(function (error) {
    console.log(error);
    process.exit(1);
});

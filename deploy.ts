// Contract deployment on JS Runtime

import { ethers } from "ethers";
import { config } from "dotenv";
import { readFileSync } from "fs-extra";

// Local Only
config();

async function main() {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");

  // This is the address that we sign out transactions through and also encrypt
  const wallet = new ethers.Wallet(process.env.WalletAddress || "", provider);

  // extract abi to deploy, do it synchronously because we need to wait for it
  const abi = readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");

  // A contract factory is just an object used to deploy contracts
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");

  // We can add gasLimit, gasPrice below
  let tx = await contractFactory.deploy();
  const transactionReceipt = await tx.deploymentTransaction()?.wait(1);
  const contract = new ethers.Contract(
    transactionReceipt?.contractAddress || "",
    abi,
    wallet
  );

  console.log("Here is the transaction receipt");
  console.log(transactionReceipt);

  await contract.store(7);
  const currentFavoriteNumber = await contract.retrieve();
  console.log("Current Favorite Number: ", currentFavoriteNumber.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

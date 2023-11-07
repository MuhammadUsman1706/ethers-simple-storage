// Contract deployment on JS Runtime

import { ethers } from "ethers";
import { config } from "dotenv";
import { readFileSync } from "fs-extra";

// Local Only
config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

  // This is the address that we sign out transactions through and also encrypt
  const wallet = new ethers.Wallet(String(process.env.PRIVATE_KEY), provider);

  // extract abi to deploy, do it synchronously because we need to wait for it
  const abi = readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");

  // A contract factory is just an object used to deploy contracts
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");

  // We can add gasLimit, gasPrice below
  let contractTransaction = await contractFactory.deploy();
  const contractTransactionReceipt = await contractTransaction
    .deploymentTransaction()
    ?.wait(1);
  const contract = new ethers.Contract(
    contractTransactionReceipt?.contractAddress || "",
    abi,
    wallet
  );

  console.log("Here is the transaction receipt");
  console.log(contractTransactionReceipt);

  const transactionRespnse = await contract.store("7");
  const transactionReceipt = await transactionRespnse.wait(1);
  console.log(transactionReceipt);

  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

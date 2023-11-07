import { ethers } from "ethers";
import { config } from "dotenv";
import { writeFileSync } from "fs-extra";

// Local Only
config();

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || "");
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD || ""
    // process.env.PRIVATE_KEY || ""
  );
  console.log(encryptedJsonKey);
  writeFileSync("./.encryptedKey.json", encryptedJsonKey);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

const fs = require("fs");
require("dotenv").config();
const { ethers } = require("ethers");

// const API_KEY = process.env.RINKEBY_API_KEY;
// const PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY;
// const CONTRACT_ADDRESS = process.env.FACTORY_ADDRESS;

async function createContract(customerAddress, vendorAddress , paymentAmount, test = false) {
  let API_KEY, PRIVATE_KEY, CONTRACT_ADDRESS;
  test = false;
  CONTRACT_ADDRESS = vendorAddress;
  if (!test) {
    API_KEY = process.env.RINKEBY_API_KEY;
    PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY;
    // CONTRACT_ADDRESS = process.env.FACTORY_ADDRESS;
  } else {
    // PRIVATE_KEY =
    //   "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    
  }

  // console.log(API_KEY);
  // console.log(PRIVATE_KEY);
  

  const contractAbi = fs.readFileSync("./abis/AssuredPayFactory.abi", "utf8");
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545/"
  );
  const alchemyProvider = new ethers.providers.AlchemyProvider(
    (network = "rinkeby"),
    API_KEY
  );
  const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

  const factoryContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractAbi,
    signer
  );

  // const tx = await factoryContract.i_vendor();
  // console.log(tx);

  const txResponse = await factoryContract.createContract(
    customerAddress,
    ethers.utils.parseEther(paymentAmount.toString())
  );

  //   const txReceipt = await txResponse.wait();
  const rc = await txResponse.wait(1);
  const event = rc.events.find((event) => event.event === "ContractCreated");
  const [contractAddress, customer, vendor, amount] = event.args;

  // const customer = "0xc3cAC51F49BD8FB74A8016780B03cD03752C1790";
  // const contractAddress = "0xAF4dB7636bebFFf2AF84F37Dc935Bd788c830F36";

  return { customer, contractAddress };
  // console.log(event.args);
  // console.log("\n");

  // console.log(customer, contractAddress, amount, vendor);

  //   console.log("-------Events--------\n" , txReceipt.events);
}

module.exports = createContract;

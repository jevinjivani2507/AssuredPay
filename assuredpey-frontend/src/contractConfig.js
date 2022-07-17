import factoryContractABI from "./ABI/factoryContractABI";
import aShortPayABI from "./ABI/aShortPayABI";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const daiAddress = "0x747e43173374aa39D70a014AB18C7E9e762fE5b9";
const daiAbi = factoryContractABI;

export {provider, signer, daiAddress, daiAbi};
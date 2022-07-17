import React, { useEffect, useState } from "react";
import factoryContractABI from "../ABI/factoryContractABI";
import { ethers } from "ethers";
import ContractRow from "./ContractRow";
import {provider, signer, daiAddress, daiAbi} from "../contractConfig"

const Vendor = () => {
  const [contracts, setContracts] = useState([]);

  const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);

  useEffect(() => {
    async function getContract() {
      const address =  await daiContract.getContracts();
      // const result = address.forEach(element => {console.log(element)});        
      return address;
    }
    getContract().then((constracts) => setContracts(constracts));
  }, []);


  return (
    <div className="bg-gray-100 min-h-[91vh] h-full p-10">
      {contracts.length > 0 && contracts.map((contract) => (
        <ContractRow key={contract} address={contract}/>
      ))}
    </div>
  );
};

export default Vendor;

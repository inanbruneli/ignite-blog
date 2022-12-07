import { useMetamask, useDisconnect, useContract, useAddress } from '@thirdweb-dev/react';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";



export default function Teste() {
  const { contract } = useContract("0xa980989AAC7B089D1a183E0cbF0054a36053c102", "nft-drop")
  console.log(contract)

  return (
    <button> clica ai</button>
  )
}

import { createPublicClient, http, createWalletClient, formatEther, ReadContractErrorType, toHex, hexToString, Address, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import * as dotenv from "dotenv";
import { abi, bytecode } from "../artifacts/contracts/Ballot.sol/Ballot.json";

dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";

async function main() {
    const parameters = process.argv.slice(2);
    if (!parameters || parameters.length < 1)
      throw new Error("Parameter not provided");
    const contractAddress = parameters[0] as `0x${string}`;
    if (!contractAddress) throw new Error("Contract address not provided");
    if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
      throw new Error("Invalid contract address");
  
    const publicClient = createPublicClient({
        chain: sepolia,
        transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
    });

    const winningProposal = (await publicClient.readContract({
        address: contractAddress as Address,
        abi,
        functionName: "winningProposal"
    }))

    console.log("Wining Proposal: ", winningProposal);

    const winnerName = await publicClient.readContract({
        address: contractAddress as Address,
        abi,
        functionName: "winnerName"
    })

    console.log("Winning proposal name:", hexToString(winnerName as `0x${string}`));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
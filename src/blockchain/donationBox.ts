export const DONATIONBOX_ADDRESS = import.meta.env.VITE_DONATIONBOX_ADDRESS as
  | `0x${string}`
  | undefined;

export const donationBoxAbi = [
  {
    type: "function",
    name: "donate",
    stateMutability: "payable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "totalReceived",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    type: "function",
    name: "contributions",
    stateMutability: "view",
    inputs: [{ type: "address", name: "" }],
    outputs: [{ type: "uint256", name: "" }],
  },
] as const;

export const donationBoxContract = {
  address: DONATIONBOX_ADDRESS,
  abi: donationBoxAbi,
} as const;


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
    name: "totalDonations",
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
  {
    type: "function",
    name: "donorStats",
    stateMutability: "view",
    inputs: [{ type: "address", name: "" }],
    outputs: [
      { type: "uint256", name: "totalDonated" },
      { type: "uint256", name: "donationCount" },
      { type: "uint256", name: "firstDonationAt" },
      { type: "uint256", name: "lastDonationAt" },
    ],
  },
  {
    type: "function",
    name: "getDonationsByDonor",
    stateMutability: "view",
    inputs: [{ type: "address", name: "donor" }],
    outputs: [
      {
        type: "tuple[]",
        name: "",
        components: [
          { type: "address", name: "donor" },
          { type: "uint256", name: "amount" },
          { type: "uint256", name: "timestamp" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "getDonorDonationCount",
    stateMutability: "view",
    inputs: [{ type: "address", name: "donor" }],
    outputs: [{ type: "uint256", name: "" }],
  },
] as const;

export const donationBoxContract = {
  address: DONATIONBOX_ADDRESS,
  abi: donationBoxAbi,
} as const;


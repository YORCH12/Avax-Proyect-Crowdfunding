// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {DonationBox} from "../contracts/DonationBox.sol";

interface Vm {
    function envUint(string calldata name) external returns (uint256);
    function startBroadcast(uint256 privateKey) external;
    function stopBroadcast() external;
}

contract DeployDonationBox {
    address private constant HEVM_ADDRESS =
        address(uint160(uint256(keccak256("hevm cheat code"))));
    Vm private constant vm = Vm(HEVM_ADDRESS);

    function run() external returns (DonationBox deployed) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);
        deployed = new DonationBox();
        vm.stopBroadcast();
    }
}

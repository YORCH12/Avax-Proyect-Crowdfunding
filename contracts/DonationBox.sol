// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * Contrato demo para conectar el frontend con la blockchain.
 * - Acepta AVAX nativo (payable).
 * - Registra el total recaudado y cuánto aportó cada address.
 */
contract DonationBox {
    uint256 public totalReceived;
    address public owner;

    mapping(address => uint256) public contributions;

    event Donated(address indexed donor, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function donate() public payable {
        require(msg.value > 0, "ZERO_AMOUNT");
        totalReceived += msg.value;
        contributions[msg.sender] += msg.value;
        emit Donated(msg.sender, msg.value);
    }

    // Permite donar enviando AVAX sin especificar data (receive()).
    receive() external payable {
        donate();
    }
}


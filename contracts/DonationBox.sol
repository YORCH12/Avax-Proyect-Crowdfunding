// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * DonationBox para AVAX C-Chain / Fuji.
 * - Recibe AVAX nativo.
 * - Lleva registro global e individual.
 * - Emite eventos para indexadores/frontends.
 */
contract DonationBox {
    error ZeroAmount();
    error InvalidDonor();
    error InvalidIndex();

    struct Donation {
        address donor;
        uint256 amount;
        uint256 timestamp;
    }

    struct DonorStats {
        uint256 totalDonated;
        uint256 donationCount;
        uint256 firstDonationAt;
        uint256 lastDonationAt;
    }

    uint256 public totalReceived;
    uint256 public totalDonations;
    address public immutable owner;

    // Registro individual acumulado (compatibilidad con versión básica).
    mapping(address => uint256) public contributions;
    // Registro individual enriquecido.
    mapping(address => DonorStats) public donorStats;

    // Registro global de todas las donaciones.
    Donation[] private _allDonations;
    // Historial por donante.
    mapping(address => Donation[]) private _donationsByDonor;

    event Donated(
        address indexed donor,
        uint256 amount,
        uint256 indexed donationId,
        uint256 timestamp
    );

    constructor() {
        owner = msg.sender;
    }

    function donate() public payable {
        if (msg.value == 0) revert ZeroAmount();
        if (msg.sender == address(0)) revert InvalidDonor();

        uint256 currentTimestamp = block.timestamp;
        uint256 donationId = _allDonations.length;

        totalReceived += msg.value;
        totalDonations += 1;
        contributions[msg.sender] += msg.value;

        DonorStats storage stats = donorStats[msg.sender];
        if (stats.donationCount == 0) {
            stats.firstDonationAt = currentTimestamp;
        }
        stats.totalDonated += msg.value;
        stats.donationCount += 1;
        stats.lastDonationAt = currentTimestamp;

        Donation memory donation = Donation({
            donor: msg.sender,
            amount: msg.value,
            timestamp: currentTimestamp
        });

        _allDonations.push(donation);
        _donationsByDonor[msg.sender].push(donation);

        emit Donated(msg.sender, msg.value, donationId, currentTimestamp);
    }

    // Permite donar enviando AVAX sin especificar data.
    receive() external payable {
        donate();
    }

    // -------------------------
    // Consultas de historial
    // -------------------------
    function getDonationById(uint256 donationId)
        external
        view
        returns (Donation memory)
    {
        if (donationId >= _allDonations.length) revert InvalidIndex();
        return _allDonations[donationId];
    }

    function getGlobalDonationCount() external view returns (uint256) {
        return _allDonations.length;
    }

    function getDonationsByDonor(address donor)
        external
        view
        returns (Donation[] memory)
    {
        return _donationsByDonor[donor];
    }

    function getDonorDonationCount(address donor)
        external
        view
        returns (uint256)
    {
        return _donationsByDonor[donor].length;
    }
}


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {DonationBox} from "../contracts/DonationBox.sol";

interface Vm {
    function prank(address msgSender) external;
    function deal(address account, uint256 newBalance) external;
    function expectRevert(bytes4) external;
}

contract DonationBoxTest {
    address private constant HEVM_ADDRESS =
        address(uint160(uint256(keccak256("hevm cheat code"))));
    Vm private constant vm = Vm(HEVM_ADDRESS);

    DonationBox internal box;
    address internal donor1 = address(0xA11CE);
    address internal donor2 = address(0xB0B);

    function setUp() public {
        box = new DonationBox();
        vm.deal(donor1, 10 ether);
        vm.deal(donor2, 10 ether);
    }

    function testOwnerIsDeployer() public {
        assertEq(box.owner(), address(this), "owner should be deployer");
    }

    function testDonateRevertsWhenAmountIsZero() public {
        vm.prank(donor1);
        vm.expectRevert(DonationBox.ZeroAmount.selector);
        box.donate{value: 0}();
    }

    function testDonateUpdatesGlobalAndIndividualStats() public {
        vm.prank(donor1);
        box.donate{value: 1 ether}();

        assertEq(box.totalReceived(), 1 ether, "totalReceived");
        assertEq(box.totalDonations(), 1, "totalDonations");
        assertEq(box.contributions(donor1), 1 ether, "contributions");

        (
            uint256 totalDonated,
            uint256 donationCount,
            uint256 firstDonationAt,
            uint256 lastDonationAt
        ) = box.donorStats(donor1);

        assertEq(totalDonated, 1 ether, "stats.totalDonated");
        assertEq(donationCount, 1, "stats.donationCount");
        assertTrue(firstDonationAt > 0, "stats.firstDonationAt");
        assertEq(lastDonationAt, firstDonationAt, "stats.lastDonationAt");
    }

    function testReceiveFunctionAlsoRegistersDonation() public {
        vm.prank(donor2);
        (bool success, ) = payable(address(box)).call{value: 2 ether}("");
        assertTrue(success, "receive call failed");

        assertEq(box.totalReceived(), 2 ether, "totalReceived");
        assertEq(box.contributions(donor2), 2 ether, "contributions");
        assertEq(box.getGlobalDonationCount(), 1, "global donation count");
    }

    function testGlobalAndIndividualHistory() public {
        vm.prank(donor1);
        box.donate{value: 1 ether}();

        vm.prank(donor1);
        box.donate{value: 2 ether}();

        vm.prank(donor2);
        box.donate{value: 3 ether}();

        assertEq(box.getGlobalDonationCount(), 3, "global history length");
        assertEq(box.getDonorDonationCount(donor1), 2, "donor1 history length");
        assertEq(box.getDonorDonationCount(donor2), 1, "donor2 history length");

        DonationBox.Donation memory d0 = box.getDonationById(0);
        DonationBox.Donation memory d2 = box.getDonationById(2);

        assertEq(d0.donor, donor1, "donation 0 donor");
        assertEq(d0.amount, 1 ether, "donation 0 amount");
        assertEq(d2.donor, donor2, "donation 2 donor");
        assertEq(d2.amount, 3 ether, "donation 2 amount");
    }

    function testGetDonationByIdRevertsOnInvalidIndex() public {
        vm.expectRevert(DonationBox.InvalidIndex.selector);
        box.getDonationById(999);
    }

    function assertEq(uint256 a, uint256 b, string memory err) internal pure {
        require(a == b, err);
    }

    function assertEq(address a, address b, string memory err) internal pure {
        require(a == b, err);
    }

    function assertTrue(bool ok, string memory err) internal pure {
        require(ok, err);
    }
}

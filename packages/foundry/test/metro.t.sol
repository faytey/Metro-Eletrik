// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Test, console2} from "../lib/forge-std";
import "../contracts/metro.sol";
import "../contracts/IMetro.sol";
import "../contracts/metroFactory.sol";

contract MetroTest is Test {
    MetroFactory metrofactory;
    address controller = 0xc6d123c51c7122d0b23e8B6ff7eC10839677684d;
    address admin = 0x49207A3567EF6bdD0bbEc88e94206f1cf53c5AfC;


    address user = 0x5D319012daEA8Fa10BbE8eBe79E4572988ecf0Ab;
    address user2 = 0x6d2e03b7EfFEae98BD302A9F836D0d6Ab0002766;

    function setUp() public {
        vm.prank(controller);
        metrofactory = new MetroFactory();
    }

    function test_createDisco() public {
        vm.prank(admin);
        address childDisco = metrofactory.createDisco("Ghana Electric", 10);

        vm.prank(admin);
        IMETRO(childDisco).setPricePerUnit(14);

        vm.prank(user);
        IMETRO(childDisco).buyUnitsWithUSDC(14, 3035500);

        vm.prank(user);
        IMETRO(childDisco).buyUnitsWithEther(14, 3035500);

        vm.prank(user);
        IMETRO(childDisco).withdrawUSDC(user2, 10000000000);

        vm.prank(user);
        IMETRO(childDisco).withdrawETH(user2, 0.005 ether);
    }

   
}

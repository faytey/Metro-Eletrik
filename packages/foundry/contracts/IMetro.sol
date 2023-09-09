// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2;

interface IMETRO {
    function setPricePerUnit(uint amount) external;

    function buyUnitsWithUSDC(uint unitAmt, uint meterNo) external;

    function buyUnitsWithEther(uint unitAmt, uint meterNo) external;

    function withdrawETH(address to, uint amount) external;

    function withdrawUSDC(address to, uint amount) external;
}
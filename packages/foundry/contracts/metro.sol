// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2;

/// @title An electricity subscription dApp that accepts payments in Ether and stablecoin USDC
/// @author Okoli Evans, Faith Roberts, Olorunfemi Babalola Samuel

import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "./pricefeed.sol";
import "./metroFactoryInterface.sol";

contract Metro {
    PriceConsumerV3 priceConsumerV3;

    event DiscoLogs(string message, address disco);
    event SubLogs(uint amount, address buyer);
    event Subscription(uint units, address user, uint256 meterNo);

    struct User {
        address wallet;
        uint256 meterNo;
        uint256 newSub;
        uint256 totalSubs;
    }

    User[] public users;
    string _name;
    address _factory;
    address _admin;
    address USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    address METR = 0xF2761f79E26BEC23906A59aD10e777e3b1b2dEF3; //deployed on Sepolia
    uint256 _unitPrice;
    uint256 public totalSubs;

    constructor(
        string memory name,
        address admin,
        address factory,
        uint256 unitPrice
    ) {
        _name = name;
        _factory = factory;
        _admin = admin;
        _unitPrice = unitPrice;
    }
    User user;

    modifier onlyAdmin() {
        require(msg.sender == _admin, "Not admin for Disco");
        _;
    }

    function setPricePerUnit(
        uint256 amount
    ) external onlyAdmin() {
        if (amount == 0 || amount == _unitPrice)
            revert("setPricePerUnit: Invalid uint price");
        _unitPrice = amount;
    }

    function buyUnitsWithUSDC(
        uint256 unitAmount,
        uint256 meterNo
    ) external {
        if (unitAmount < _unitPrice)
            revert("buyUnitsWithUSDC: Invalid unit price");

        IERC20(USDC).transferFrom(msg.sender, address(this), unitAmount);

        user.newSub = unitAmount;
        user.meterNo = meterNo;
        user.wallet = msg.sender;
        user.totalSubs += unitAmount;
        IMetro(_factory).clppr(msg.sender);
        totalSubs += unitAmount;
        emit Subscription(unitAmount, msg.sender, meterNo);
    }


    function buyUnitsWithEther(
        uint256 unitAmount,
        uint256 meterNo
    ) external payable {
        if (unitAmount < _unitPrice || meterNo <= 0)
            revert("buyUnits: Invalid unit price");
        (bool success, ) = payable(address(this)).call{value: unitAmount}("");
        require(success, "Ether transfer fail");

        uint256 EtherPrice = uint(priceConsumerV3.LatestETHprice());
        uint256 units = (EtherPrice * unitAmount);

        user.meterNo = meterNo;
        user.newSub = units;
        user.wallet = msg.sender;
        user.totalSubs += units;
        IMetro(_factory).clppr(msg.sender);
        totalSubs += units;
        emit Subscription(units, msg.sender, meterNo);
    }

    function withdrawETH(
        address to,
        uint256 amount
    ) external payable onlyAdmin {
        if (to == address(0) || amount <= 0)
            revert("withdrawETH: Invalid address or amount");
        (bool success, ) = payable(to).call{value: amount}("");
        require(success, "Ether withdraw_D failed");
    }

    function withdrawUSDC(
        address to,
        uint amount
    ) external onlyAdmin returns (bool success) {
        if (to == address(0) || amount <= 0)
            revert("withdrawETH: Invalid address or amount");
        if (IERC20(USDC).transferFrom(address(this), to, amount)) {
            success = true;
        }
    }

    ///////////////////////////////////////////////////
    //          HELPER FUNCTIONS                    //
    /////////////////////////////////////////////////

    function _quota(uint value) internal pure returns (uint) {
        uint perc = 15;
        uint comm = (value * perc) / 100;
        return comm;
    }

    receive() external payable {}
}

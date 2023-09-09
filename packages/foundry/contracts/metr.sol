// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/IERC20.sol';
contract MetroToken is ERC20 {
constructor() ERC20("Metro", "METR") {
// Mint 100 tokens to msg.sender
// Similar to how
// 1 dollar = 100 cents
// 1 token = 1 * (10 ** decimals)
_mint(msg.sender, 1000000 * 10 ** uint(decimals()));
}
}

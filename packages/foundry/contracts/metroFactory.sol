// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

import "./metro.sol";
import "openzeppelin-contracts/contracts/utils/Address.sol";
import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";


contract MetroFactory {
    using Address for address;
    
    event DiscoLogs(string message, address disco);

    struct Disco {
        string name;
        address wallet;
        address admin;
        uint256 unitPrice;
    }

    mapping(address user => bool airdropped) private _freebieRecd;
    mapping(address account => Disco) refDisco;
    Disco[] public discos;
    address controller;
    address METR = 0xF2761f79E26BEC23906A59aD10e777e3b1b2dEF3;

    constructor() {
        controller = msg.sender;
    }

    modifier onlyController() {
        require(msg.sender == controller, "Not Controller");
        _;
    }

    function createDisco(
        string memory name,
        uint256 unitPrice
    ) external returns (address nDisco) {
        bytes32 nullHash = keccak256(abi.encode(""));
        bytes32 nameHash = keccak256(abi.encode(name));

        if (nullHash == nameHash) revert("addDisco: Empty name field");
        if (unitPrice <= 0) revert("addDisco: Invalid unit price");

        Metro metro = new Metro(name, msg.sender, address(this), unitPrice);

        address childMetro = address(metro);

        refDisco[childMetro].name = name;
        refDisco[childMetro].wallet = childMetro;
        refDisco[childMetro].admin = msg.sender;
        refDisco[childMetro].unitPrice = unitPrice;

        discos.push(
            Disco({
                name: name,
                wallet: childMetro,
                admin: msg.sender,
                unitPrice: unitPrice
            })
        );

        nDisco = childMetro;
        emit DiscoLogs("Added Disco", childMetro);
    }

    ///@notice Function returns all Discos created
    function retDiscos() external view returns(Disco[] memory) {
        return discos;
    }

    ///@notice Function reassigns Controller role to new address
    function replcController(address newController) external onlyController {
        if (newController == address(0)) revert("replcController: Address_0");
        controller = newController;
    }

        function withdrawETH_Met(
        address to,
        uint256 amount
    ) external payable onlyController {
        if (to == address(0) || amount <= 0)
            revert("withdrawETH_Met: Invalid address or amount");
        (bool success, ) = payable(to).call{value: amount}("");
        require(success, "Ether withdraw failed");
    }

    function clppr(address _user) external {
        address caller = msg.sender;
        if(_freebieRecd[_user]) revert("clppr: already received free token");
        if(caller.isContract()) {
            IERC20(METR).transfer(_user, 10);
            _freebieRecd[_user] = true;
        }
    }

    receive() external payable {}
}

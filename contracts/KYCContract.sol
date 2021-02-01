// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract KYCContract is Ownable {
    mapping(address => bool) allowed;

    function setKYCCompleted(address addr) public onlyOwner {
        allowed[addr] = true;
    }

    function setKYCRevoked(address addr) public onlyOwner {
        allowed[addr] = false;
    }

    function KYCCompleted(address addr) public view returns(bool) {
        return allowed[addr];
    }
}
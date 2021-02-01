// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.8.0;

import "./MyCrowdsale.sol";
import "./KYCContract.sol";

contract MyTokenSale is Crowdsale {
    KYCContract kyc;
    constructor(uint256 rate, address payable wallet, IERC20 token, KYCContract _kyc) 
    Crowdsale(rate, wallet, token) public {
        kyc = _kyc;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(kyc.KYCCompleted(beneficiary), "KYC not completed yet, aborting");
    }
}
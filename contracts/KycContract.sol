// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

 contract KycContract  is Ownable{
     mapping(address => bool) allowed;

     function setKyc(address _add) public onlyOwner {
         allowed[_add] = true;
     }

    function revokeKyc(address _add) public onlyOwner {
        allowed[_add] = false;
     }

    function kycCompleted(address _add) public view returns(bool){
        return allowed[_add];
     }
 }
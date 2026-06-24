//SPDX-License-Identifier: MIT
pragma solidity^0.8.0;

contract Calculator{
uint256 public result;
    function add(uint256 a, uint256 b) public {
        result = a+b;
    }

    function subtract (uint256 a , uint256 b) public {
        result = a-b;
    }

    function multiply (uint256 a , uint256 b) public {
         result = a * b;
    }

    function divide (uint256 a , uint256 b) public {
        require(b!=0, "Cannot divide by 0");
        result  = a/b;
    }

    function modulus (uint256 a , uint256 b) public {
         require(b!=0, "Cannot divide by 0");
         result = a%b;
    }
}
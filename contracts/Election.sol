pragma solidity ^0.6.10; // Solidity version (latest - Jun 2020)
// SPDX-License-Identifier: TODO

contract Election { // Contract declaration

  string public candidate; // Solidity gives you a getter automatically?

  // Constructor (runs one time when contract is deploy)
  constructor() public {
    candidate = "Candidate 1";
  }
}

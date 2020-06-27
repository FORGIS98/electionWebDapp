pragma solidity ^0.6.10; // Solidity version (latest - Jun 2020)
// SPDX-License-Identifier: TODO

contract Election { // Contract declaration

  // Model Candidate
  struct Candidate{
    uint id;
    string name;
    uint voteCount;
  }

  // Mapping (is like a Hash Map in Java or diccionary in Python)
  // Here we store all candidates struc
  mapping(uint => Candidate) public candidates; // id => candidate

  // Amount of candidates (it will help with the mapping)
  // (We can't iterate on mappìngs)
  uint public candidatesCount;

  // Constructor (runs one time when contract is deploy)
  constructor() public {
    addCandidate("Satoshi Nakamoto");
    addCandidate("Dennis Ritchie");
    addCandidate("Linus Torvalds");
  }

  // Adds a candidate to the maping
  // underscore for local variables
  function addCandidate(string memory _name) private {
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    candidatesCount += 1;
  }
}

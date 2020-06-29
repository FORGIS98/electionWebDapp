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
  // Store all candidates struc
  mapping(uint => Candidate) public candidates; // id => candidate

  // Store accounts that have voted
  mapping(address => bool) public voters;

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

  function vote(uint _candidateId) public {

    // Require that the voter haven't vote yet.
    require(!voters[msg.sender]);
    // Require that the candidate is valid
    require(_candidateId >= 0 && _candidateId < candidatesCount);

    // Record that a voter has voted (we only want them to vote 1 time)
    voters[msg.sender] = true;
  
    // Add a vote to a candidate
    candidates[_candidateId].voteCount += 1;
  }
}

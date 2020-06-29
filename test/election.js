const Election = artifacts.require("Election");

contract("Election", function(accounts){
      var electionInstance;

  it("initializes with three candidates", function(){
    return Election.deployed().then(function(instance){
      return instance.candidatesCount();
    }).then(function(count){
      assert.equal(count, 3);
    });
  });

  it("candidates are initialize with the correct values", function(){
    return Election.deployed().then(function(instance){
      electionInstance = instance;
      return electionInstance.candidates(0); // Candidates names
    }).then(function(candidate){
      assert.equal(candidate[0], 0, "ID doesn't match.");
      assert.equal(candidate[1], "Satoshi Nakamoto", "NAME doesn't match.");
      assert.equal(candidate[2], 0, "VOTE COUNT doesn't match.");
      return electionInstance.candidates(1);
    }).then(function(candidate){
      assert.equal(candidate[0], 1, "ID doesn't match.");
      assert.equal(candidate[1], "Dennis Ritchie", "NAME doesn't match.");
      assert.equal(candidate[2], 0, "VOTE COUNT doesn't match.");
      return electionInstance.candidates(2);
    }).then(function(candidate){
      assert.equal(candidate[0], 2, "ID doesn't match.");
      assert.equal(candidate[1], "Linus Torvalds", "NAME doesn't match.");
      assert.equal(candidate[2], 0, "VOTE COUNT doesn't match.");
    });
  });

  it("allows a voter to cast a vote", function(){
    return Election.deployed().then(function(instance){
      electionInstance = instance;
      candidateId = 0;
      return electionInstance.vote(candidateId, {from: accounts[0]});
    }).then(function(receipt){
      return electionInstance.voters(accounts[0]);
    }).then(function(voted){
      assert(voted, "Voter should be TRUE");
      return electionInstance.candidates(candidateId);
    }).then(function(candidate){
      var voteCount = candidate[2]; // 0 = ID, 1 = Name, 2 = voteCount
      assert.equal(voteCount, 1, "Vote count has not changed.");
    });
  });

  it("throws an exception for invalid candidates", function(){
    return Election.deployed().then(function(instance){
      electionInstance = instance;
      return electionInstance.vote(99, {from: accounts[1]});
    }).then(assert.fail).catch(function(error){
      assert(error.message.indexOf('revert') >= 0, "Error msg must contain rever.");
      return electionInstance.candidates(0);
      // We are going to check that our contract didn't change
    }).then(function(candidate1){
      var voteCount = candidate1[2];
      assert.equal(voteCount, 1, "Candidate 1 did receive a vote and it shouldn't.");
      return electionInstance.candidates(1);
    }).then(function(candidate2){
      var voteCount = candidate2[2];
      assert.equal(voteCount, 0, "Candidate 2 did receive a vote and it shouldn't.")
    });
  });

  it("throws an exception for double voting", function(){
    return Election.deployed().then(function(instance){
      electionInstance = instance;
      candidateId = 1;
      electionInstance.vote(candidateId, {from: accounts[1]});
      return electionInstance.candidates(candidateId);
    }).then(function(candidate){
      var voteCount = candidate[2];
      assert.equal(voteCount, 1, "The first vote should be accepted.");
      // We try to vote again, it should fail
      return electionInstance.vote(candidateId, {from: accounts[1]});
    }).then(assert.fail).catch(function(error){
      assert(error.message.indexOf('rever') >= 0, "Error message must contain revert.");
      return electionInstance.candidates(0);
    }).then(function(candidate1){
      var voteCount = candidate1[2];
      assert.equal(voteCount, 1, "Candidate 1 did receive a vote and it shouldn't");
      return electionInstance.candidates(1);
    }).then(function(candidate2){
      var voteCount = candidate2[2];
      assert.equal(voteCount, 1, "Candidate 2 did receive a vote and it shouldn't");
    });
  });

});

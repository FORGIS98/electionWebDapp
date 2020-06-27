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

});

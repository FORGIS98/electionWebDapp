# electionWebDapp

This project is from a January 2018 video on youtube by Dapp University channel, after 2 and a half years solidity versions has changed so this isn't going to be a 100% equal to the code in the video (but close enough).

Youtube tutorial video: https://www.youtube.com/watch?v=3681ZYbDSSk&list=FLhftHSLmRN2T2X4F6750wFg&index=0
Oficial github repo: https://github.com/dappuniversity/election/tree/2019_update


# Dependencies

NodeJs: JavaScript Runtime  
Npm: Package Manager for the JavaScrpt  
Truffle: Development environment for blockchain dapps  
Ganache: Quickly fire up a personal Ethereum blockchain  
Metamask: Crypto wallet (browser extension)  

ArchLinux like:
```bash
sudo pacman -S nodejs
sudo pacman -S npm 
npm install -g truffle
echo "Check: https://www.trufflesuite.com/ganache"
echo "Check: https://metamask.io/"
```

Ubuntu like:
```bash
sudo apt install nodejs 
sudo apt install npm 
npm install -g truffle
echo "Check: https://www.trufflesuite.com/ganache"
echo "Check: https://metamask.io/"
```


# Installation / Make it work.

First download the repo, and inside run `npm install` (this should install all the dependencies). Then you need `ganache` running on `localhost:8545` (should be the defualt option so no big deal). Then run `truffle migrate` and after the compilation run `npm run dev`.  This should open a browser with this page:

After you open `metamask` and change the network to `localhost:8545` then import an account from `ganache` using the private key of the account you want. Then reload the page, and you should be ready to vote...Hope it works :/


# Commands and Info (for my knowledge)

Interesting fact, the 1 time you deploy you use `truffle migrate` then next times you should use `truffle migrate --reset`

Usefull command: `truffle console`  
Usefull command (inside truffle console): `Election.deployed().then(function(instance){app = instance;})`  
Usefull command (inside truffle console): `web3.<tab>`  

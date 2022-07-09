# adas
A blockchain-based academic document authenticity system

## Contracts structure setup 
The smart contracts use [Hardhat](https://hardhat.org/), an Ethereum development environment to compile, run and deploy on a development network.<br/>
The project uses [Solidity](https://docs.soliditylang.org/en/v0.8.15/) programming language to write the smart contracts<br/><br/>
To add Hardhat to the adas project follow the steps;<br/>
**_Prerequisite(s)_: Nodejs**

|Command                           |Description                                                  |
| --------------------------------- | ------------------------------------------------------------ |
| ``` npm init -y ```                       | initializes the contracts project                            |
| ``` npm install --save-dev hardhat ```    | adds Hardhat to the contracts project                        |
| ``` npx hardhat ```                      | adds JavaScript or TypeScript structure to contracts project | 
| ``` npx hardhat compile ```               | compiles the smart contracts solidity files                  |
| ``` npx hardhat test ```                  | runs the smart contracts tests                               |
| ``` npx hardhat run scripts/deploy.js ``` | deploys smart contracts                                      |
| ``` npx hardhat help ```                  | displays more hardhat options                   



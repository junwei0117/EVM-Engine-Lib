# EVM Engine Lib
> EVM Engine JavaScript monorepo

This is the EVM Engine JavaScript library, which allows you to do the following:
- Creat accounts
- Send transactions
- Deploy contracts
- Interact with contracts

## Installing the library

To install the TangleID library and its dependencies, you can use one of the following options:

Install using [npm](https://www.npmjs.org/):

```shell
npm install evm-engine-lib
```

or using [yarn](https://yarnpkg.com/):

```shell
yarn add evm-engine-lib
```

## Getting started

To connect to a local EVM-Lite node, do the following:

```javascript
import { composeAPI } from '@v860117/evm-engine-lib'

const APIHost = 'localhost';
const APIPort = 8080;
const defaultAddress = '0X0000000000000000000000000000000000000000';

const engineAPI = composeAPI(APIHost, APIPort, defaultAddress);

```

## API Reference
 #### .composeAPI(APIHost, APIPort, defaultAddress)
 #### .createAccount(password, value)
 #### .fetchAccount(address)
 #### .transfer(keystore, password, address, value)
 #### .deployContract(keystore, password, contract, name, version, parameters)
 #### .interactContract(keystore, password, address, abi, method, parameters, value)

 ### .createAccount(password, value)
| Name      | Type   | Default  | Description                                 |
| --------- | ------ | -------  | ------------------------------------------- | 
| password  | string | password | **Optional.** Password of the account.      |
| value     | number | 0        | **Optional.** Initial value of the account. |

### .fetchAccount(address)
| Name     | Type   | Description             |
| -------- | ------ | ----------------------- | 
| address  | string | address of the account. |

### .transfer(keystore, password, address, value)
| Name     | Type   | Description                                                                     |
| -------- | ------ | ------------------------------------------------------------------------------- |
| address  | string | Address of the sender.                                                          |
| password | string | Password of the sender account, it will be used for decrpyting the `keystore`.  |
| keystore | JSON   | Key store of the sender account.                                                |
| value    | number | Value of currency that will be tranfer from sender account to receiver account. |

### .deployContract(keystore, password, contract, name, version, parameters)
| Name       | Type   | Description                                 |
| ---------- | ------ | ------------------------------------------- |
| keystore   | string | Key store of the contract owner.            |
| password   | string | Password of the contract owner.             |
| contract   | string | A contract is written in Solidity language. |
| name       | string | Contract name.                              |
| version    | string | Solc version.                               |
| parameters  | Array  | Parameters of the method that will be used for method arguments. |

### .interactContract(keystore, password, address, abi, method, parameters, value)
| Name        | Type   | Description                                                      |
| ----------- | ------ | ---------------------------------------------------------------- |
| address     | string | Address of the deployed contract                                 |
| keystore    | JSON   | Key store of the user.                                           |
| password    | string | Password of the user.                                            |
| contract    | string | A contract written in Solidity language.                         |
| method      | string | Method name of the smart contract.                               |
| parameters  | Array  | Parameters of the method that will be used for method arguments. |

## Contributing

### Bootstrap your environments

1. Clone this repository.
```shell
$ git clone https://github.com/mushroom0117/EVM-Engine-Lib.git
```

2. Install the dependency packages.
```shell
$ yarn run init
```

### Running tests

```shell
$ yarn test
```

## Licensing

EVM Engine Lib is freely redistributable under the MIT License. Use of this source
code is governed by a MIT-style license that can be found in the `LICENSE` file.
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
npm install @v860117/evm-engine-lib
```

or using [yarn](https://yarnpkg.com/):

```shell
yarn add @v860117/evm-engine-lib
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

 ### .composeAPI(APIHost, APIPort, defaultAddress)
 | Name   | Type   | Default  | Description                                 |
| ------- | ------ | -------  | ------------------------------------------- | 
| host    | string | password | Password of the account.      |
| port    | number | 0        | Initial value of the account. |
| address | string | 0        | Initial value of the account. |

 ### .createAccount(password, value)
 | Name      | Type   | Default  | Description                                 |
| --------- | ------ | -------  | ------------------------------------------- | 
| password  | string | password | **Optional.** Password of the account.      |
| value     | number | 0        | **Optional.** Initial value of the account. |

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
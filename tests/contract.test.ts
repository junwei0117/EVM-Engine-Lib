import { composeAPI } from '../src/composeAPI';
import { APIHost, APIPort, CrowdFunding, accountA as contributer, accountB as fundraiser } from './config';
jest.setTimeout(30000);

const engineAPI = composeAPI(APIHost, APIPort, contributer.address);

let contract: any;

describe('Deploy contract', () => {
  beforeAll(async () => {
    const keystore = contributer.keystore;
    const password = 'password';
    const contractName = 'CrowdFunding';
    const compilerVersion = 'v0.4.25+commit.59dbf8f1';
    const fundingGoal = [10];
    const parameters = [fundingGoal, fundraiser.address];

    contract = await engineAPI.deployContract(
      keystore,
      password,
      CrowdFunding,
      contractName,
      compilerVersion,
      parameters,
    );
  });

  test('Contract Address MUST be same as 0x<40 hex character>', () => {
    expect(contract.address).toMatch(/0x/);
  });

  test('Contract ABI fromat MUST be an JSON', () => {
    expect(typeof (contract.abi)).toBe('object');
  });
});

describe('Interact with contract', () => {
  let responce: any;

  beforeAll(async () => {
    const keystore = contributer.keystore;
    const password = 'password';
    const abi = contract.abi;
    const address = contract.address;
    const method = 'contribute';
    const parameters: never[] = [];
    const value = 10;

    responce = await engineAPI.interactContract(
      keystore,
      password,
      address,
      abi,
      method,
      parameters,
      value,
    );
  });

  test('Contract interaction responce fromat MUST be an JSON', () => {
    expect(typeof (responce)).toBe('object');
  });
});

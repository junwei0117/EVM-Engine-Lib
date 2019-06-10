import { composeAPI } from '../src/composeAPI';
import { APIHost, APIPort, defaultAddress } from './config';

let account: any;

const createAccount = async (value = 0) => {
  const engineAPI = composeAPI(APIHost, APIPort, defaultAddress);
  account = await engineAPI.createAccount('password', value);
};

describe('Generate account', () => {
  beforeAll(() => {
    createAccount();
  });

  test('Address format MUST be same as 0x<40 hex character>', () => {
    expect(account.address).toMatch(/0x/);
  });

  test('Keystore format MUST be same as V3JSONKeyStore', () => {
    expect(typeof(account.keystore)).toBe('object');
  });

});

describe('Generate account wiht initialize value', () => {
  beforeAll(() => {
    createAccount(1000);
  });

  test('Address format MUST be same as 0x<40 hex character>', () => {
    expect(account.address).toMatch(/0x/);
  });

  test('Keystore format MUST be same as V3JSONKeyStore', () => {
    expect(typeof(account.keystore)).toBe('object');
  });

});

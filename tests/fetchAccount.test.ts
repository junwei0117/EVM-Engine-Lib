import { composeAPI } from '../src/composeAPI';
import { APIHost, APIPort, defaultAddress } from './config';

const engineAPI = composeAPI(APIHost, APIPort, defaultAddress);

describe('Fetch Account', () => {
  let account: any;

  beforeAll(async () => {
    account = await engineAPI.fetchAccount(defaultAddress);
  });

  test('Address MUST same as account address', () => {
    expect((account.address).toUpperCase()).toBe(defaultAddress);
  });

  test('Balance format MUST be string', () => {
    expect(typeof(account.balance)).toBe('string');
  });

  test('Nonce format MUST be number', () => {
    expect(typeof(account.nonce)).toBe('number');
  });
});

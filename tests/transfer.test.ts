import { composeAPI } from '../src/composeAPI';
import { APIHost, APIPort, accountA as sender, accountB as receiver } from './config';

const engineAPI = composeAPI(APIHost, APIPort, sender.address);

describe('Transfer', () => {
  let receipt: any;

  beforeAll(async () => {
    const keystore = sender.keystore;
    const password = 'password';
    const address = receiver.address;
    const value = 900;

    receipt = await engineAPI.transfer(keystore, password, address, value);
  });

  test('Transfer return format MUST be an object', () => {
    expect(typeof(receipt)).toBe('object');
  });

  test('From address MUST same as sender address', () => {
    expect(receipt.tx.from.value).toBe(sender.address);
  });

  test('To address MUST same as sender address', () => {
    expect(receipt.tx.to.value).toBe(receiver.address);
  });

  test('Value MUST same as transfer value', () => {
    expect(receipt.tx.value).toBe(900);
  });
});

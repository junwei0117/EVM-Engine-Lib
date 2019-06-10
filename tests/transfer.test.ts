import { composeAPI } from '../src/composeAPI';
import { APIHost, APIPort, defaultAddress } from './config';

const engineAPI = composeAPI(APIHost, APIPort, defaultAddress);

describe('Transfer', () => {
  let sender: any;
  let receiver: any;
  let receipt: any;

  beforeAll(async () => {
    sender = await engineAPI.createAccount('password', 1000);
    receiver = await engineAPI.createAccount('password');
    receipt = await engineAPI.transfer(
      sender.keystore,
      'password',
      receiver.address,
      900,
    );
  });

  test('Transfer return format MUST be object', async () => {
    expect(typeof(receipt)).toBe('object');
  });

  test('From address MUST same as sender address', () => {
    expect(receipt.tx.from.value).toBe(sender.address);
  });

  test('From address MUST same as sender address', () => {
    expect(receipt.tx.from.value).toBe(sender.address);
  });

  test('Value MUST same as transfer value', () => {
    expect(receipt.tx.value).toBe(900);
  });

  test('Sender balance MUST only has 100', async () => {
    const senderAccount = await engineAPI.fetchAccount(sender.address);
    expect(senderAccount.balance).toBe(100);
  });

  test('Receiver balance MUST has 900', async () => {
    const receiverAccount = await engineAPI.fetchAccount(receiver.address);
    expect(receiverAccount.balance).toBe(100);
  });

});

import { V3JSONKeyStore } from 'evm-lite-core';

export const createAccount = (evmlc: any) => {
  return async (password: string, value?: number) => {
    const keystore: V3JSONKeyStore = await evmlc.accounts.create().encrypt(password);
    const address = '0x' + keystore.address;

    if (value && value > 0) {
      const transaction = await evmlc.accounts.prepareTransfer(address, value);
      await transaction.send();
    }

    return { address, keystore };
  };
};

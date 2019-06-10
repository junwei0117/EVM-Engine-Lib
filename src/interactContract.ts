import { V3JSONKeyStore } from 'evm-lite-core';

export const createAccount = (evmlc: any) => {
  return async (
    keystore: V3JSONKeyStore,
    password: string,
    address: string,
    abi: any,
    method: string,
    parameters?: any,
    value?: number,
    ) => {
    const account = await evmlc.accounts.decrypt(keystore, password);
    const contractInstance = await evmlc.contracts.load(abi, { contractAddress: address });
    const transaction = await contractInstance.methods[method](...parameters);

    if (transaction === undefined) {
      throw new Error(`Method '${method}' not in ${contractInstance.methods}`);
    }

    if (value && typeof value === 'number') {
      await transaction.value(value);
    }

    const response = await transaction.submit(account);

    return response;
  };
};

export const transfer = (evmlc: any) => {
  return async (keystore: any, password: string, address: string, value: number) => {
    const sender = await evmlc.accounts.decrypt(keystore, password);

    const transaction = await evmlc.accounts.prepareTransfer(address, value);
    await transaction.submit(sender);

    return transaction;
  };
};

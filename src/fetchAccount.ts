export const fetchAccount = (evmlc: any) => {
  return async (address: string) => {
    const account = await evmlc.accounts.getAccount(address);

    return account;
  };
};

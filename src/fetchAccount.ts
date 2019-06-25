import { isAddress } from './guards';

export const fetchAccount = (evmlc: any) => {
  return async (address: string) => {
    if (isAddress(address)) {
      const account = await evmlc.accounts.getAccount(address);

      return account;
    } else {
      return Error('Address format error');
    }
  };
};

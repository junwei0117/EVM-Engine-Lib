interface IJSONKeyStore {
  version: number;
  id: string;
  address: string;
  crypto: {
    ciphertext: string;
    cipherparams: {
      iv: string;
    };
    cipher: string;
    kdf: string;
    kdfparams: {
      dklen: number;
      salt: string;
      n: number;
      r: number;
      p: number;
    };
    mac: string;
  };
}

export const isAddress = (address: string) => {
  if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
    return true;
  }
  return false;
};

export const isPassword = (password: string) => {
  if (typeof (password) === 'string') {
    return true;
  }
  return false;
};

export const isValue = (value: number) => {
  if (typeof (value) === 'number') {
    return true;
  }
  return false;
};

export const isKeystore = (keystore: any): keystore is IJSONKeyStore => {
  if ('version' in keystore && 'id' in keystore && 'address' in keystore && 'crypto' in keystore) {
    return true;
  }
  return false;
};

export const isSolidity = (contract: string) => {
  if (/pragma solidity+/.test(contract)) {
    return true;
  }
  return false;
};

export const isParameters = (parameters: any[]) => {
  if (Array.isArray(parameters)) {
    return true;
  }
  return false;
};

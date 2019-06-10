// @ts-ignore
import * as solc from 'solc';
import { V3JSONKeyStore } from 'evm-lite-core';

export const deployContract = (evmlc: any) => {
  return async (
    keystore: V3JSONKeyStore,
    password: string,
    contract: string,
    name: string,
    version: string,
    parameters?: any,
  ) => {
    const account = await evmlc.accounts.decrypt(keystore, password);

    const compiled = await compileContract(name, contract, version);

    const contractInstance = await evmlc.contracts.load(compiled.abi, { data: compiled.bytecode });
    const receipt = await contractInstance.deploy(account, parameters);

    return { address: receipt.options.address.value, abi: compiled.abi, receipt };
  };
};

const compileContract = async (name: string, content: string, compilerVersion: string) => {
  const compileObject = createCompileObject(name, content);
  const compiler = await loadRemoteCompiler(compilerVersion);
  const compiled = JSON.parse(compiler.compile((JSON.stringify(compileObject))));

  const bytecode = compiled.contracts[`${name}.sol`][`${name}`].evm.bytecode.object;
  const abi = compiled.contracts[`${name}.sol`][`${name}`].abi;

  return { bytecode, abi };
};

const createCompileObject = (name: string, content: string) => {
  const contractFileName = `${name}.sol`;
  const compileObject = {
    language: 'Solidity',
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
    sources: {
      [contractFileName]: {
        content,
      },
    },
  };

  return compileObject;
};

const loadRemoteCompiler = (version: string): Promise<any> => {
  const load = new Promise((resolve, reject) => {
    solc.loadRemoteVersion(version, (error: any, compiler: any) => {
      if (error) {
        return reject('Failed to load remote solidity compiler');
      }
      resolve(compiler);
    });
  });

  return load;
};

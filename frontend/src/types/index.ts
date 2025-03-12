export interface Network {
  id: string;
  name: string;
  url: string;
}

export interface WalletConfig {
  id: string;
  name: string;
  secretKey: string;
}

export interface ContractConfig {
  id: string;
  name: string;
  contractId: string;
}

export interface ContractFunction {
  id: string;
  name: string;
  parameters: Parameter[];
}

export interface Parameter {
  key: string;
  value: string;
}

export interface SavedFunction {
  id: string;
  name: string;
  contractId: string;
  parameters: Parameter[];
}
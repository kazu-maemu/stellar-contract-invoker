export interface IContract {
  id: number;
  name: string;
  contract_id: string;
}

export interface IKeyPair {
  id: number;
  name: string;
  pub_key: string;
  sec_key: string;
}

export interface IFunc {
  id: number;
  name: string;
  params: string;
}

export enum ParamType {
  Array = "array",
  JSON = "json",
  PublicKey = "public_key",
  Contract = "contract",
  String = "string",
  Number = "number",
}

export interface IParam {
  id: string;
  type: ParamType;
  key: string;
  value: string;
  children?: IParam[];
}

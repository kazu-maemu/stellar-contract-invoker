export interface Contract {
  id: string;
  name: string;
  contract_id: string;
}

export interface KeyPair {
  id: string;
  name: string;
  pub_key: string;
  sec_key: string;
}

export interface Func {
  id: string;
  name: string;
  params: string;
}

import { v4 as uuid } from "uuid";
import { IParam, ParamType } from "../types";

const removeQuotes = (str: string) => {
  return str.replace(/^['"]|['"]$/g, "");
};

const isJSON = (str: string) => {
  const jsonRegex = /^\{|\}$/g;
  return jsonRegex.test(str);
};

const isArray = (str: string) => {
  const arrayRegex = /^\[|\]$/g;
  return arrayRegex.test(str);
};

const isPublicKey = (str: string) => {
  const publicKeyRegex = /^G[A-Z2-7]{55}$/;
  return publicKeyRegex.test(str);
};

const isContract = (str: string) => {
  const contractRegex = /^C[A-Z2-7]{55}$/;
  return contractRegex.test(str);
};

const isString = (str: string) => {
  const stringRegex = /^['"]|['"]$/g;
  return stringRegex.test(str);
};

const getType = (value: string) => {
  const type = isString(value) ? ParamType.String : ParamType.Number;
  let str = removeQuotes(value);
  switch (true) {
    case isPublicKey(str):
      return ParamType.PublicKey;
    case isContract(str):
      return ParamType.Contract;
    case isJSON(str):
      return ParamType.JSON;
    case isArray(str):
      return ParamType.Array;
    default:
      return type;
  }
};

const parseJSON = (json: string) => {
  const obj = JSON.parse(json);
  const params: IParam[] = [];
  for (let key in obj) {
    params.push({
      key,
      ...parseParam(JSON.stringify(obj[key])),
    });
  }
  return params;
};

const parseArray = (array: string) => {
  const arr = JSON.parse(array);
  return arr.map((el) => parseParam(JSON.stringify(el)));
};

const parseParam = (param: string) => {
  const type = getType(param);
  const value = removeQuotes(param);
  if (type == ParamType.JSON) {
    return {
      id: uuid(),
      type,
      value: "",
      children: parseJSON(value),
    };
  }
  if (type == ParamType.Array) {
    return {
      id: uuid(),
      type,
      value: "",
      children: parseArray(value),
    };
  }
  return {
    id: uuid(),
    type,
    value,
  };
};

export const parseParams = (params: string): IParam[] => {
  const [_, ...paramArray] = params.split("--");
  return paramArray.map((param) => {
    const index = param.indexOf(" ");
    const key = param.substring(0, index);
    const value = param.substring(index + 1).trim();
    return {
      key,
      ...parseParam(value),
    };
  });
};

const getStringFromParam = (param: IParam) => {
  if (param.type == ParamType.Array)
    return `[${param.children
      ?.map((param) => getStringFromParam(param))
      .join(", ")}]`;
  if (param.type == ParamType.JSON)
    return `{${param.children
      ?.map((param) => `"${param.key}": ${getStringFromParam(param)}`)
      .join(", ")}}`;
  if (param.type == ParamType.Number) return `${param.value}`;
  return `"${param.value}"`;
};

export const getStringFromParams = (params: IParam[]) => {
  return params
    .map((param) => {
      if (
        param.type == ParamType.String ||
        param.type == ParamType.Number ||
        param.type == ParamType.Contract ||
        param.type == ParamType.PublicKey
      ) {
        return `--${param.key} ${param.value}`;
      }
      return `--${param.key} '${getStringFromParam(param)}'`;
    })
    .join(" ");
};

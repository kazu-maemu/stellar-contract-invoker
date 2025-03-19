import { Select } from "@chakra-ui/react";
import { FC } from "react";
import { ParamType } from "../types";

interface Props {
  paramType: ParamType;
  setParamType: (paramType: ParamType) => void;
}

const types = [
  {
    value: ParamType.Array,
    label: "Array",
  },
  {
    value: ParamType.JSON,
    label: "JSON",
  },
  {
    value: ParamType.PublicKey,
    label: "PublicKey",
  },
  {
    value: ParamType.Contract,
    label: "Contract",
  },
  {
    value: ParamType.String,
    label: "String",
  },
  {
    value: ParamType.Number,
    label: "Number",
  },
]

const ParamTypeSelect: FC<Props> = ({ paramType, setParamType }) => {
  return (
    <Select
      value={paramType}
      onChange={(e) => setParamType(e.target.value as ParamType)}
    >
      {types.map((t, index) => (
        <option key={index} value={t.value}>
          {t.label}
        </option>
      ))}
    </Select>
  )
}

export default ParamTypeSelect;

import {
  Button,
  HStack,
  Input,
  StackProps,
  VStack
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import { v4 as uuid } from 'uuid';
import { IParam, ParamType } from '../types';
import ContractSelect from './ContractSelect';
import KeyPairSelect from './KeyPairSelect';
import ParamTypeSelect from './ParamTypeSelect';

interface Props extends StackProps {
  type?: ParamType;
  param: IParam;
  setParam?: (param: IParam) => void;
  onDelete: () => void;
}

const Param: FC<Props> = ({ type, param, setParam, onDelete, ...props }) => {
  return (
    <VStack pl={2} spacing={2} align="stretch" {...props}>
      <HStack spacing={2}>
        <ParamTypeSelect
          paramType={param.type}
          setParamType={(paramType) => {
            const newParam = { ...param, type: paramType };
            setParam?.(newParam);
          }}
        />
        {type != ParamType.Array && (
          <Input
            value={param.key}
            placeholder="Enter parameter name"
            onChange={(e) => {
              const newParam = { ...param, key: e.target.value };
              setParam?.(newParam);
            }}
          />
        )}
        {(param.type == ParamType.String || param.type == ParamType.Number) && (
          <Input
            value={param.value}
            onChange={(e) => {
              const newParam = { ...param, value: e.target.value };
              setParam?.(newParam);
            }}
          />
        )}
        {param.type == ParamType.PublicKey && (
          <KeyPairSelect pubKey={param.value} setPubKey={(pubKey) => {
            const newParam = { ...param, value: pubKey };
            setParam?.(newParam);
          }} />
        )}
        {param.type == ParamType.Contract && (
          <ContractSelect contractId={param.value} setContractId={(contractId) => {
            const newParam = { ...param, value: contractId };
            setParam?.(newParam);
          }} />
        )}
        <Button colorScheme='red' onClick={onDelete}>
          <FaTrash />
        </Button>
      </HStack>
      {param.children && param.children.map((child) => (
        <Param
          key={child.id}
          type={param.type}
          param={child}
          setParam={(newParam) => {
            const newChildren = param.children?.map((c) => (c.id == child.id ? newParam : c));
            setParam?.({ ...param, children: newChildren });
          }}
          onDelete={() => {
            const newChildren = param.children?.filter((c) => c.id != child.id);
            setParam?.({ ...param, children: newChildren });
          }}
        />
      ))}
      {(param.type == ParamType.Array || param.type == ParamType.JSON) && (
        <Button
          ml={4}
          colorScheme="blue"
          onClick={() => {
            const newParam = { ...param, children: [...(param.children ?? []), { id: uuid(), type: ParamType.String, key: '', value: '' }] };
            setParam?.(newParam);
          }}
        >
          Add Child
        </Button>
      )}
    </VStack>
  );
}

export default Param;

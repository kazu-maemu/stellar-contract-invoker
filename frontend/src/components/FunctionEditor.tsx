import {
  Box,
  Button,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Text,
  Textarea,
  VStack
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { FaPlay, FaPlus, FaSave, FaTrash } from 'react-icons/fa';
import { v4 as uuid } from 'uuid';
import useFunc from '../api/useFunc';
import { AppContext } from '../App';
import { IFunc, IParam, ParamType } from '../types';
import { getStringFromParams, parseParams } from '../utils';
import axios from '../utils/axios';
import Param from './Param';

export const FunctionEditor = () => {
  const queryClient = useQueryClient();
  const { contract, account } = useContext(AppContext);
  const { funcs } = useFunc();

  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [func, setFunc] = useState<IFunc | undefined>(undefined);
  const [name, setName] = useState('');
  const [params, setParams] = useState<IParam[]>([]);
  const [result, setResult] = useState('');

  const paramsString = useMemo(() => getStringFromParams(params), [params]);

  useEffect(() => {
    if (func) {
      setName(func.name);
      setParams(parseParams(func.params));
    } else {
      setName('');
      setParams([]);
    }
  }, [func]);

  const handleAdd = async () => {
    setIsAdding(true);
    try {
      await axios.post(`/func`, { name, params: paramsString });
      queryClient.invalidateQueries({ queryKey: ['func'] });
    } catch (error) {
      console.error('There was an error adding the function:', error);
    }
    setIsAdding(false);
  }

  const handleUpdate = async () => {
    if (!func) return;
    setIsUpdating(true);
    try {
      await axios.patch(`/func/${func.id}`, { name, params: paramsString });
      queryClient.invalidateQueries({ queryKey: ['func'] });
    } catch (error) {
      console.error('There was an error updating the function:', error);
    }
    setIsUpdating(false);
  }

  const handleDelete = async () => {
    if (!func) return;
    setIsDeleting(true);
    try {
      await axios.delete(`/func/${func.id}`);
      queryClient.invalidateQueries({ queryKey: ['func'] });
      setFunc(undefined);
    } catch (error) {
      console.error('There was an error deleting the function:', error);
    }
    setIsDeleting(false);
  }

  const handleExecute = async () => {
    if (!account) return;
    if (!contract) return;
    setIsLoading(true);
    try {
      const command = `soroban contract invoke --id ${contract.contract_id} --source-account ${account.sec_key} --network testnet -- ${name} ${paramsString}`;
      const { data: { stdout, stderr } } = await axios.post(`/contract/run`, { command });
      const prettyStdout = ((stdout) => {
        try {
          return `${JSON.stringify(JSON.parse(stdout), null, 2)}\n`;
        } catch (err) {
          return stdout;
        }
      })(stdout);
      setResult(`${prettyStdout}${stderr}`);
    } catch (error) {
      console.error('There was an error executing the function:', error);
    }
    setIsLoading(false);
  }

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={4} p={4} borderWidth="1px" borderRadius="lg" bg="white" shadow="sm">
      <GridItem colSpan={4}>
        <VStack spacing={2} align="stretch">
          {funcs.map((f: any) => (
            <Text
              key={f.id}
              cursor="pointer"
              {...(f.id == (func?.id ?? 0) ? { color: 'blue.500' } : {})}
              _hover={{ color: 'blue.500' }}
              onClick={() => setFunc(f)}
            >
              {f.name}
            </Text>
          ))}
          <Button colorScheme="green" onClick={() => setFunc(undefined)}>
            New
          </Button>
        </VStack>
      </GridItem>
      <GridItem colSpan={8}>
        <VStack spacing={4} align="stretch">
          <Box>
            <FormLabel>Function Name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter function name"
            />
          </Box>

          <VStack spacing={2} align="stretch">
            <FormLabel>Parameters</FormLabel>
            {params.map((param) => (
              <Param
                key={param.id}
                param={param}
                setParam={(param) => {
                  const newParams = params.map((p) => (p.id == param.id ? param : p));
                  setParams(newParams);
                }}
                onDelete={() => {
                  const newParams = params.filter((p) => p.id != param.id);
                  setParams(newParams);
                }}
              />
            ))}
            <Button colorScheme="blue" onClick={() => setParams([...params, { id: uuid(), type: ParamType.String, key: '', value: '' }])}>
              Add Parameter
            </Button>
          </VStack>

          <HStack justify="flex-end" spacing={2}>
            <Button
              isLoading={isLoading}
              colorScheme="red"
              onClick={handleExecute}
            >
              <FaPlay />
            </Button>
            {func ? (
              <Button
                colorScheme="blue"
                onClick={handleUpdate}
                isLoading={isUpdating}
              >
                <FaSave />
              </Button>
            ) : (
              <Button
                colorScheme="green"
                onClick={handleAdd}
                isLoading={isAdding || isUpdating}
              >
                <FaPlus />
              </Button>
            )}
            <Button colorScheme="red" onClick={handleDelete} isLoading={isDeleting} disabled={!func}>
              <FaTrash />
            </Button>
          </HStack>

          <Box>
            <FormLabel>Result</FormLabel>
            <Textarea minH={80} value={result} readOnly />
          </Box>
        </VStack>
      </GridItem>
    </Grid>
  );
};

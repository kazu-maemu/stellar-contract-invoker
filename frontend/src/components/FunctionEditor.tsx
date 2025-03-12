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
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import { Func } from '../types';
import axios from '../utils/axios';

export const FunctionEditor = () => {
  const queryClient = useQueryClient();
  const { contractId, account } = useContext(AppContext);

  const { data } = useQuery({
    queryKey: ['func'],
    queryFn: () => axios.get<Func[]>('/func'),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const funcs = data?.data ?? [];

  const [func, setFunc] = useState<Func | undefined>(undefined);
  const [name, setName] = useState('');
  const [params, setParams] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    if (func) {
      setName(func.name);
      setParams(func.params);
    } else {
      setName('');
      setParams('');
    }
  }, [func]);

  const handleSave = async () => {
    if (func) {
      await axios.patch(`/func/${func.id}`, { name, params });
    } else {
      await axios.post(`/func`, { name, params });
    }
    queryClient.invalidateQueries({ queryKey: ['func'] });
  }

  const handleExecute = async () => {
    if (!account)
      throw new Error('Please select account to sign transaction');
    const command = `soroban contract invoke \ --id ${contractId} \ --source-account ${account.sec_key} \ --network testnet \ -- ${name} ${params ? `\ ${params.replace('{{OWNER}}', account.pub_key)}` : ''}`;
    const { data: { stdout, stderr } } = await axios.post(`/contract/run`, { command });
    const prettyStdout = ((stdout) => {
      try {
        return `${JSON.stringify(JSON.parse(stdout), null, 2)}\n`;
      } catch (err) {
        return stdout;
      }
    })(stdout);
    setResult(`${prettyStdout}${stderr}`);
  }

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={4} p={4} borderWidth="1px" borderRadius="lg" bg="white" shadow="sm">
      <GridItem colSpan={4}>
        <VStack spacing={2} align="stretch">
          {funcs.map((func: any) => (
            <HStack
              key={func.id}
              p={2}
              _hover={{ bg: 'gray.50' }}
              borderRadius="md"
              cursor='pointer'
              onClick={() => setFunc(func)}
            >
              <Text flex={1}>{func.name}</Text>
              <Button
                size="sm"
              >
              </Button>
            </HStack>
          ))}
          <Button onClick={() => setFunc(undefined)}>
            Add new
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

          <Box>
            <FormLabel>Parameters</FormLabel>
            <Textarea minH={40} value={params} onChange={(e) => setParams(e.target.value)} />
          </Box>

          <Box>
            <FormLabel>Result</FormLabel>
            <Textarea minH={40} value={result} readOnly />
          </Box>

          <HStack justify="flex-end" spacing={2}>
            <Button onClick={handleSave}>Save Function</Button>
            <Button colorScheme="blue" onClick={handleExecute}>Execute</Button>
          </HStack>
        </VStack>
      </GridItem>
    </Grid>
  );
};

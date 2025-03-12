import {
  Box,
  Button,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  VStack
} from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { KeyPair } from '../types';
import axios from '../utils/axios';

export const KeyPairs = () => {
  const queryClient = useQueryClient();
  const { setAccount } = useContext(AppContext);

  const { data } = useQuery({
    queryKey: ['key-pair'],
    queryFn: () => axios.get<KeyPair[]>('/key-pair'),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const keyPairs = data?.data ?? [];

  const [name, setName] = useState('');
  const [pubKey, setPubKey] = useState('');
  const [secKey, setSecKey] = useState('');

  const handleAdd = async () => {
    await axios.post(`/key-pair`, {
      name,
      pub_key: pubKey,
      sec_key: secKey,
    });
    queryClient.invalidateQueries({ queryKey: ['key-pair'] });
  }

  return (
    <VStack spacing={4} align="stretch" p={4} borderWidth="1px" borderRadius="lg" bg="white" shadow="sm">
      <VStack spacing={2} align="stretch">
        <Box>
          <FormLabel>
            Name
          </FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Box>
        <Box>
          <FormLabel>
            Public key
          </FormLabel>
          <Input value={pubKey} onChange={(e) => setPubKey(e.target.value)} />
        </Box>
        <Box>
          <FormLabel>
            Secret key
          </FormLabel>
          <Input value={secKey} onChange={(e) => setSecKey(e.target.value)} />
        </Box>
        <Button onClick={handleAdd}>
          Add new
        </Button>
      </VStack>
      <Heading size="md" mb={4}>Key pairs</Heading>
      <VStack spacing={2} align="stretch">
        {keyPairs.map((keyPair: KeyPair) => (
          <HStack
            key={keyPair.id}
            p={2}
            _hover={{ bg: 'gray.50' }}
            borderRadius="md"
            cursor='pointer'
            onClick={() => setAccount?.(keyPair)}
          >
            <Text flex={1}>{keyPair.name}</Text>
            <Button
              size="sm"
            >
            </Button>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};
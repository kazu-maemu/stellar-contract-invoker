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
import { useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import useKeyPair from '../api/useKeypair';
import { AppContext } from '../App';
import { IKeyPair } from '../types';
import axios from '../utils/axios';

export const KeyPairs = () => {
  const queryClient = useQueryClient();
  const { account, setAccount } = useContext(AppContext);
  const { keyPairs } = useKeyPair();

  const [name, setName] = useState('');
  const [pubKey, setPubKey] = useState('');
  const [secKey, setSecKey] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAdd = async () => {
    setIsAdding(true);
    try {
      await axios.post(`/key-pair`, {
        name,
        pub_key: pubKey,
        sec_key: secKey,
      });
      queryClient.invalidateQueries({ queryKey: ['key-pair'] });
    } catch (error) {
      console.error('There was an error adding the key pair:', error);
    }
    setIsAdding(false);
  }

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await axios.delete(`/key-pair/${id}`);
      queryClient.invalidateQueries({ queryKey: ['key-pair'] });
    } catch (error) {
      console.error('There was an error deleting the key pair:', error);
    }
    setIsDeleting(false);
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
        <Button colorScheme="green" onClick={handleAdd} isLoading={isAdding}>
          Add
        </Button>
      </VStack>
      <Heading size="md" mb={4}>Key pairs</Heading>
      <VStack spacing={2} align="stretch">
        {keyPairs.map((keyPair: IKeyPair) => (
          <HStack
            key={keyPair.id}
            p={2}
            _hover={{ bg: 'gray.50' }}
            {...(account?.id === keyPair.id ? { bg: 'gray.100' } : {})}
            borderRadius="md"
            cursor='pointer'
            onClick={() => setAccount?.(keyPair)}
          >
            <Text flex={1}>{keyPair.name}</Text>
            <Button
              onClick={() => handleDelete(keyPair.id)}
              isLoading={isDeleting}
              colorScheme="red"
              size="sm"
            >
              <FaTrash />
            </Button>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};
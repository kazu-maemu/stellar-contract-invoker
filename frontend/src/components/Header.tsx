import {
  Box,
  Flex,
  HStack,
  Image,
  Select,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Contract } from '../types';
import axios from '../utils/axios';

const networks = [
  { id: '1', name: 'Testnet', url: 'https://horizon-testnet.stellar.org' },
  { id: '2', name: 'Public', url: 'https://horizon.stellar.org' },
];

export const Header = () => {
  const { setContractId } = useContext(AppContext);

  const { data } = useQuery({
    queryKey: ['contract'],
    queryFn: () => axios.get<Contract[]>('/contract'),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const contracts = data?.data ?? [];

  return (
    <Box bg="white" px={6} py={4} shadow="sm">
      <Flex alignItems="center">
        <HStack spacing={3}>
          <Image
            src="https://stellar.org/favicon.ico"
            alt="Stellar Logo"
            boxSize="24px"
          />
          <Text fontSize="xl" fontWeight="bold">
            Stellar Contract Helper
          </Text>
        </HStack>
        <Spacer />
        <HStack spacing={4}>
          <Select placeholder="Select network" w="200px">
            {networks?.map((network) => (
              <option key={network.id} value={network.id}>
                {network.name}
              </option>
            ))}
          </Select>
          <Select
            placeholder="Select contract"
            w="200px"
            onChange={(e) => setContractId?.(e.target.value)}
          >
            {contracts?.map((contract) => (
              <option key={contract.id} value={contract.contract_id}>
                {contract.name}
              </option>
            ))}
          </Select>
        </HStack>
      </Flex>
    </Box>
  );
};
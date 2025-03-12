import React from 'react';
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

const mockNetworks = [
  { id: '1', name: 'Testnet', url: 'https://horizon-testnet.stellar.org' },
  { id: '2', name: 'Public', url: 'https://horizon.stellar.org' },
];

const mockWallets = [
  { id: '1', name: 'Test Wallet 1', secretKey: 'SAMPLE_KEY_1' },
];

const mockContracts = [
  { id: '1', name: 'Test Contract', contractId: 'CONTRACT_ID_1' },
];

export const Header = () => {
  const { data: networks } = useQuery({
    queryKey: ['networks'],
    queryFn: () => mockNetworks
  });

  const { data: wallets } = useQuery({
    queryKey: ['wallets'],
    queryFn: () => mockWallets
  });

  const { data: contracts } = useQuery({
    queryKey: ['contracts'],
    queryFn: () => mockContracts
  });

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
          <Select placeholder="Select wallet" w="200px">
            {wallets?.map((wallet) => (
              <option key={wallet.id} value={wallet.id}>
                {wallet.name}
              </option>
            ))}
          </Select>
          <Select placeholder="Select contract" w="200px">
            {contracts?.map((contract) => (
              <option key={contract.id} value={contract.id}>
                {contract.name}
              </option>
            ))}
          </Select>
        </HStack>
      </Flex>
    </Box>
  );
};
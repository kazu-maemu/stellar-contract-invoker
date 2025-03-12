import React from 'react';
import {
  Box,
  Select,
  Button,
  VStack,
  FormLabel,
  HStack,
  useQuery
} from '@chakra-ui/react';

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

export const ConfigSection = () => {
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
    <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" shadow="sm">
      <VStack spacing={4} align="stretch">
        <Box>
          <FormLabel>Network</FormLabel>
          <Select placeholder="Select network">
            {networks?.map((network) => (
              <option key={network.id} value={network.id}>
                {network.name}
              </option>
            ))}
          </Select>
        </Box>

        <Box>
          <FormLabel>Wallet</FormLabel>
          <Select placeholder="Select wallet" mb={2}>
            {wallets?.map((wallet) => (
              <option key={wallet.id} value={wallet.id}>
                {wallet.name}
              </option>
            ))}
          </Select>
          <HStack spacing={2}>
            <Button size="sm">Add Wallet</Button>
            <Button size="sm">Edit</Button>
            <Button size="sm">Remove</Button>
          </HStack>
        </Box>

        <Box>
          <FormLabel>Contract</FormLabel>
          <Select placeholder="Select contract" mb={2}>
            {contracts?.map((contract) => (
              <option key={contract.id} value={contract.id}>
                {contract.name}
              </option>
            ))}
          </Select>
          <HStack spacing={2}>
            <Button size="sm">Add Contract</Button>
            <Button size="sm">Edit</Button>
            <Button size="sm">Remove</Button>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};
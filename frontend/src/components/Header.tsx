import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Select,
  Spacer,
  Text
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import useContract from '../api/useContract';
import { AppContext } from '../App';
import axios from '../utils/axios';
import AddContractModal from './AddContractModal';
import ContractSelect from './ContractSelect';
import EditContractModal from './EditContractModal';

const networks = [
  { id: '1', name: 'Testnet', url: 'https://horizon-testnet.stellar.org' },
  { id: '2', name: 'Public', url: 'https://horizon.stellar.org' },
];

export const Header = () => {
  const queryClient = useQueryClient();
  const { contract, setContract } = useContext(AppContext);
  const { contracts } = useContract();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!contract) return;
    setIsDeleting(true);
    try {
      await axios.delete(`/contract/${contract.id}`);
      queryClient.invalidateQueries({ queryKey: ['contract'] });
      setContract?.(undefined);
    } catch (error) {
      console.error('There was an error deleting the contract:', error);
    }
    setIsDeleting(false);
  };

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
          <Select placeholder="Select network">
            {networks?.map((network) => (
              <option key={network.id} value={network.id}>
                {network.name}
              </option>
            ))}
          </Select>
          <ContractSelect
            contractId={contract?.contract_id}
            setContractId={(contract_id) => setContract?.(contracts.find((c) => c.contract_id == contract_id))}
          />
          <AddContractModal />
          {contract && <EditContractModal contract={contract} />}
          <Button colorScheme="red" onClick={handleDelete} isLoading={isDeleting} disabled={!contract}>
            <FaTrash />
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};
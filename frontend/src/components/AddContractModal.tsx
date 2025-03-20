import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from '../utils/axios';

const AddContractModal: React.FC = () => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [contractName, setContractName] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddContract = async () => {
    setIsAdding(true);
    try {
      await axios.post('/contract', { name: contractName, contract_id: contractAddress });
      queryClient.invalidateQueries({ queryKey: ['contract'] });
      onClose();
    } catch (error) {
      console.error('There was an error adding the contract:', error);
    }
    setIsAdding(false);
  };

  return (
    <>
      <Button flex='none' colorScheme='green' onClick={onOpen}>
        <FaPlus />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Contract</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="contract-name" isRequired>
              <FormLabel>Contract Name</FormLabel>
              <Input
                value={contractName}
                onChange={(e) => setContractName(e.target.value)}
                placeholder="Enter contract name"
              />
            </FormControl>

            <FormControl id="contract-address" isRequired mt={4}>
              <FormLabel>Contract Address</FormLabel>
              <Input
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder="Enter contract address"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleAddContract} isLoading={isAdding}>
              Add Contract
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddContractModal;

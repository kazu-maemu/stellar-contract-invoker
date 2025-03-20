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
  useDisclosure,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { IContract } from '../types';
import axios from '../utils/axios';

interface Props {
  contract: IContract;
}

const EditContractModal: FC<Props> = ({ contract }) => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [contractId, setContractId] = useState('');

  useEffect(() => {
    setName(contract.name);
    setContractId(contract.contract_id);
    return () => { };
  }, [contract]);

  const handleEdit = async () => {
    setIsEditing(true);
    try {
      await axios.patch(`/contract/${contract.id}`, { name, contract_id: contractId });
      queryClient.invalidateQueries({ queryKey: ['contract'] });
      onClose();
    } catch (error) {
      console.error('There was an error editing the contract:', error);
    }
    setIsEditing(false);
  };

  return (
    <>
      <Button flex='none' colorScheme='blue' onClick={onOpen}>
        <FaEdit />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Contract</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Contract Name</FormLabel>
              <Input placeholder="Enter contract name" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Contract Details</FormLabel>
              <Input placeholder="Enter contract details" value={contractId} onChange={(e) => setContractId(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" isLoading={isEditing} onClick={handleEdit}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditContractModal;
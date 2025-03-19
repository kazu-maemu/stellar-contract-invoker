import {
  Select
} from '@chakra-ui/react';
import { FC } from 'react';
import useContract from '../api/useContract';

interface Props {
  contractId?: string;
  setContractId: (id: string) => void;
}

const ContractSelect: FC<Props> = ({ contractId, setContractId }) => {
  const { contracts } = useContract();

  return (
    <Select
      placeholder="Select contract"
      value={contractId}
      onChange={(e) => setContractId(e.target.value)}
    >
      {contracts.map((contract) => (
        <option key={contract.id} value={contract.contract_id}>
          {contract.name}
        </option>
      ))}
    </Select>
  )
}

export default ContractSelect;

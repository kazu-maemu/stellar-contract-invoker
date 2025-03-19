import {
  Select
} from '@chakra-ui/react';
import React, { FC } from 'react';
import useKeyPair from '../api/useKeypair';

interface Props {
  pubKey?: string;
  setPubKey: (pubKey: string) => void;
}

const KeyPairSelect: FC<Props> = ({ pubKey, setPubKey }) => {
  const { keyPairs } = useKeyPair();

  return (
    <Select
      placeholder="Select public key"
      value={pubKey}
      onChange={(e) => setPubKey(e.target.value)}
    >
      {keyPairs.map((k) => (
        <option key={k.id} value={k.pub_key}>
          {k.name}
        </option>
      ))}
    </Select>
  )
}

export default KeyPairSelect;

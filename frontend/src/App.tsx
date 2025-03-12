import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import React, { createContext, useState } from 'react';
import { FunctionEditor } from './components/FunctionEditor';
import { Header } from './components/Header';
import { KeyPairs } from './components/KeyPairs';
import { KeyPair } from './types';

interface IApp {
  contractId?: string;
  setContractId?: (contractId: string) => void;
  account?: KeyPair;
  setAccount?: (account: KeyPair) => void;
}

export const AppContext = createContext<IApp>({});

function App() {
  const [contractId, setContractId] = useState('');
  const [account, setAccount] = useState<KeyPair>();

  return (
    <AppContext.Provider
      value={{
        contractId,
        setContractId,
        account,
        setAccount,
      }}
    >
      <Box minH="100vh" bg="gray.100">
        <Header />
        <Container maxW="unset" py={6}>
          <Grid templateColumns="repeat(12, 1fr)" gap={6}>
            <GridItem colSpan={3}>
              <KeyPairs />
            </GridItem>
            <GridItem colSpan={9}>
              <FunctionEditor />
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </AppContext.Provider>
  );
}

export default App;
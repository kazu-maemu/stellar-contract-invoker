import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import React, { createContext, useState } from 'react';
import { FunctionEditor } from './components/FunctionEditor';
import { Header } from './components/Header';
import { KeyPairs } from './components/KeyPairs';
import { IContract, IKeyPair } from './types';

interface IApp {
  contract?: IContract;
  setContract?: (contract: IContract | undefined) => void;
  account?: IKeyPair;
  setAccount?: (account: IKeyPair) => void;
}

export const AppContext = createContext<IApp>({});

function App() {
  const [contract, setContract] = useState<IContract>();
  const [account, setAccount] = useState<IKeyPair>();

  return (
    <AppContext.Provider
      value={{
        contract,
        setContract: (contract) => {
          setContract(contract);
          if (contract) {
            localStorage.setItem('contract', contract.contract_id);
          } else {
            localStorage.removeItem('contract');
          }
        },
        account,
        setAccount: (account) => {
          setAccount(account);
          if (account) {
            localStorage.setItem('account', account.pub_key);
          } else {
            localStorage.removeItem('account');
          }
        },
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
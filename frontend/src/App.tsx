import React from 'react';
import { Box, Container, Grid, GridItem, VStack } from '@chakra-ui/react';
import { Header } from './components/Header';
import { FunctionTree } from './components/FunctionTree';
import { FunctionEditor } from './components/FunctionEditor';

function App() {
  return (
    <Box minH="100vh" bg="gray.100">
      <Header />
      <Container maxW="7xl" py={6}>
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          <GridItem colSpan={4}>
            <FunctionTree />
          </GridItem>
          
          <GridItem colSpan={8}>
            <FunctionEditor />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
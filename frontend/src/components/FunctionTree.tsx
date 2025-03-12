import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Button,
  HStack,
  Text,
  useQuery
} from '@chakra-ui/react';

export const FunctionTree = () => {
  const { data: savedFunctions = [] } = useQuery({
    queryKey: ['savedFunctions'],
    queryFn: () => []
  });

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" shadow="sm" mt={4}>
      <Heading size="md" mb={4}>Saved Functions</Heading>
      <VStack spacing={2} align="stretch">
        {savedFunctions.map((func: any) => (
          <HStack key={func.id} p={2} _hover={{ bg: 'gray.50' }} borderRadius="md">
            <Text flex={1}>{func.name}</Text>
            <Button size="sm">Load</Button>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};
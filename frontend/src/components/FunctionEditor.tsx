import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  FormLabel,
  HStack,
  useQuery
} from '@chakra-ui/react';

export const FunctionEditor = () => {
  const [parameters, setParameters] = useState([{ key: '', value: '' }]);
  const [functionName, setFunctionName] = useState('');

  const addParameter = () => {
    setParameters([...parameters, { key: '', value: '' }]);
  };

  const updateParameter = (index: number, field: 'key' | 'value', value: string) => {
    const newParameters = [...parameters];
    newParameters[index] = { ...newParameters[index], [field]: value };
    setParameters(newParameters);
  };

  const removeParameter = (index: number) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" shadow="sm">
      <VStack spacing={4} align="stretch">
        <Box>
          <FormLabel>Function Name</FormLabel>
          <Input
            value={functionName}
            onChange={(e) => setFunctionName(e.target.value)}
            placeholder="Enter function name"
          />
        </Box>

        <Box>
          <FormLabel>Parameters</FormLabel>
          <VStack spacing={2}>
            {parameters.map((param, index) => (
              <HStack key={index}>
                <Input
                  value={param.key}
                  onChange={(e) => updateParameter(index, 'key', e.target.value)}
                  placeholder="Key"
                />
                <Input
                  value={param.value}
                  onChange={(e) => updateParameter(index, 'value', e.target.value)}
                  placeholder="Value"
                />
                <Button onClick={() => removeParameter(index)}>Remove</Button>
              </HStack>
            ))}
          </VStack>
          <Button mt={2} onClick={addParameter}>Add Parameter</Button>
        </Box>

        <HStack justify="flex-end" spacing={2}>
          <Button>Save Function</Button>
          <Button colorScheme="blue">Execute</Button>
        </HStack>
      </VStack>
    </Box>
  );
};
import { Text } from "@chakra-ui/react";

export function Logo() {
  return (
    <Text fontSize="3xl" fontWeight="bold" w="64">
      Brainboard
      <Text as="span" ml="1" color="green.500">
        .
      </Text>
    </Text>
  );
}

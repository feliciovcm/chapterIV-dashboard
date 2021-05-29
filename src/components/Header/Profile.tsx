import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Vitor Felicio</Text>
          <Text color="gray.300" fontSize="small">
            feliciovcm@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Vitor Felicio"
        src="https://github.com/feliciovcm.png"
      />
    </Flex>
  );
}

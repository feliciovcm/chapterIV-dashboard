import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import Icon from "@chakra-ui/icon";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";

// Lidar com responsividade com tabela é muito complicado, em caso de tabela com
// muitas colunas o ideal é só colocar um scroll na tabela

export default function UserList() {
  const isWideScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>

            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="green"
              leftIcon={<Icon as={RiAddLine} />}
            >
              Criar novo
            </Button>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={["4", "4", "6"]}>
                  <Checkbox colorScheme="orange" />
                </Th>
                <Th>usuários</Th>
                {isWideScreen && <Th>Data de cadastro</Th>}

                {isWideScreen && <Th width="8"></Th>}
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="orange" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Vitor Felicio</Text>
                    <Text fontSize="sm" color="gray.300">
                      feliciovcm@gmail.com
                    </Text>
                  </Box>
                </Td>
                {isWideScreen && <Td>25 de Maio, 2021</Td>}
                {isWideScreen && (
                  <Td>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="md"
                      colorScheme="orange"
                      leftIcon={<Icon as={RiPencilLine} />}
                    >
                      Editar
                    </Button>
                  </Td>
                )}
              </Tr>
              <Tr>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="orange" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Vitor Felicio</Text>
                    <Text fontSize="sm" color="gray.300">
                      feliciovcm@gmail.com
                    </Text>
                  </Box>
                </Td>
                {isWideScreen && <Td>25 de Maio, 2021</Td>}
                {isWideScreen && (
                  <Td>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="md"
                      colorScheme="orange"
                      leftIcon={<Icon as={RiPencilLine} />}
                    >
                      Editar
                    </Button>
                  </Td>
                )}
              </Tr>
              <Tr>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="orange" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Vitor Felicio</Text>
                    <Text fontSize="sm" color="gray.300">
                      feliciovcm@gmail.com
                    </Text>
                  </Box>
                </Td>
                {isWideScreen && <Td>25 de Maio, 2021</Td>}
                {isWideScreen && (
                  <Td>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="md"
                      colorScheme="orange"
                      leftIcon={<Icon as={RiPencilLine} />}
                    >
                      Editar
                    </Button>
                  </Td>
                )}
              </Tr>
            </Tbody>
          </Table>
          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}

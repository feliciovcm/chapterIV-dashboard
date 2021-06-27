import React from "react";

import {
  Spinner,
  Button,
  Checkbox,
  Box,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import Icon from "@chakra-ui/icon";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";

import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import { useUsers } from "../../services/hooks/useUsers";

// Lidar com responsividade com tabela é muito complicado, em caso de tabela com
// muitas colunas o ideal é só colocar um scroll na tabela

export default function UserList() {
  const { data, isLoading, error, isFetching } = useUsers();

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
              {!isLoading && isFetching && (
                <Spinner ml="4" size="sm" color="gray.500" />
              )}
            </Heading>
            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="green"
                leftIcon={<Icon as={RiAddLine} />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao carregar usuários</Text>
            </Flex>
          ) : (
            <>
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
                  {data.map((user) => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="orange" />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideScreen && <Td>{user.createdAt}</Td>}
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
                  ))}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={200}
                onPageChange={() => {}}
                currentPage={16}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

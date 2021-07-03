import React from "react";

import {
  Spinner,
  Button,
  Checkbox,
  Box,
  Flex,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import Icon from "@chakra-ui/icon";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";

import NextLink from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { GetServerSideProps } from "next";

// Lidar com responsividade com tabela é muito complicado, em caso de tabela com
// muitas colunas o ideal é só colocar um scroll na tabela

export default function UserList({ users }) {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching } = useUsers(page);

  const isWideScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePreFetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const response = await api.get(`users/${userId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 min
      }
    );
  }

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
            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="green"
                leftIcon={<Icon as={RiAddLine} />}
              >
                Criar novo
              </Button>
            </NextLink>
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
                  {data.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="orange" />
                      </Td>
                      <Td>
                        <Box>
                          <Link
                            color="green.400"
                            onMouseEnter={() => handlePreFetchUser(user.id)}
                          >
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
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
                totalCountOfRegisters={data.totalCount}
                onPageChange={setPage}
                currentPage={page}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

// como o useUsers é um hook, e hooks só podem ser utilizados dentro de componentes
// React. Então importaremos a função que faz a requisição, para integrar o
// react-queries com a funcionalidade do next de server side rendering.

// export const getServerSideProps: GetServerSideProps = async () => {
//   // const { users, totalCount } = await getUsers(1);

//   // return {
//   //   props: {
//   //     users,
//   //   },
//   // };
// };

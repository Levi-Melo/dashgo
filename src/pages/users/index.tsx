import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useBreakpointValue,
  Spinner,
  Link,
} from "@chakra-ui/react";

import NextLink from "next/link";

import { client } from "../../services/queryClient";
import { api } from "../../services/api";
import { useUsers } from "../../services/hooks/useUsers";

import { Header } from "../../components/Header/Index";
import { Pagination } from "../../components/Pagination/Index";
import { Sidebar } from "../../components/Sidebar/Index";

import { RiAddLine, RiPencilLine } from "react-icons/ri";

export default function UserList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useUsers(page);

  const isWide = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(userId: string) {
    await client.prefetchQuery(
      ["users", userId],
      async () => {
        const response = await api.get(`users/${userId}`);
        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10,
      }
    );
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW="1480" mx="auto" px={["4", "4", "6"]}>
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar nova
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex align="center" justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex align="center" justify="center">
              <Text>Falha ao obter dados dos usuarios</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWide && <Th>Data de cadastro</Th>}
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map((user) => {
                    return (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td px={["4", "4", "6"]}>
                          <Box>
                            <Link
                              color="purple.400"
                              onMouseEnter={() => handlePrefetchUser(user.id)}
                            >
                              <Text fontWeight="bold">{user.name}</Text>
                            </Link>
                            <Text
                              fontSize="small"
                              color="gray.300"
                              fontWeight="bold"
                            >
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        <Td px={["4", "4", "6"]}>
                          {isWide && <Text>{user.created_at}</Text>}
                        </Td>
                        <Td>
                          {isWide && (
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="purple"
                              leftIcon={
                                <Icon as={RiPencilLine} fontSize="16" />
                              }
                            >
                              Editar
                            </Button>
                          )}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

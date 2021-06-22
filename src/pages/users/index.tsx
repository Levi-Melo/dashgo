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
} from "@chakra-ui/react";

import { useQuery } from "react-query";
import React from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header/Index";
import { Pagination } from "../../components/Pagination/Index";
import { Sidebar } from "../../components/Sidebar/Index";
import Link from "next/link";

interface User{
  id: number;
  name: string;
  email:string;
  createdAt: Date;
}

export default function UserList() {
  const { data, isLoading, error } = useQuery("users", async () => {
    const response = await fetch("http://localhost:3000/api/users");
    const data = await response.json();

    const users = data.users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR',{
          day:'2-digit',
          month:'long',
          year:'numeric'
        }),
      }
    })
    return users;
  },{
    staleTime:1000*60*5,
  });

  const isWide = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW="1480" mx="auto" px={["4", "4", "6"]}>
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>
            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar nova
              </Button>
            </Link>
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
                  {data.map((user:User)=>{
                    return (
                  <Tr key={user.id}>
                  <Td px={["4", "4", "6"]}>
                    <Checkbox colorScheme="pink" />
                  </Td>
                  <Td px={["4", "4", "6"]}>
                    <Box>
                      <Text fontWeight="bold">{user.name}</Text>
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
                    {isWide && <Text>{user.createdAt}</Text>}
                  </Td>
                  <Td>
                    {isWide && (
                      <Button
                        as="a"
                        size="sm"
                        fontSize="sm"
                        colorScheme="purple"
                        leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
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
              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

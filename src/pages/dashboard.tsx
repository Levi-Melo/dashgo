import { Flex } from "@chakra-ui/react";
import React from "react";
import { Header } from "../components/Heder";
import { Sidebar } from "../components/SideBar";

export default function dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxW="1480" mx="auto" px="6">
        <Sidebar />
      </Flex>
    </Flex>
  );
}

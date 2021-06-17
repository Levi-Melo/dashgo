import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Levi Melo</Text>
        <Text color="gray.300" fontSize="small">
          levicontat@outlook.com
        </Text>
      </Box>
      <Avatar size="md" name="Levi Melo" />
    </Flex>
  );
}

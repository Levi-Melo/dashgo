import { Flex, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { Logo } from "./Logo";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";
import { Notification } from "./NotificationsNav";

export function Header() {
  const isWide = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Logo />
      {isWide && <SearchBox />}
      <Flex align="center" ml="auto">
        <Notification />
        <Profile showProfileData={isWide} />
      </Flex>
    </Flex>
  );
}

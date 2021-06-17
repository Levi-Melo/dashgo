import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function Sidebar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <NavSection title="GERAL">
            <NavLink icon={RiDashboardLine}>Dashboard</NavLink>
            <NavLink icon={RiContactsLine}>Usuários</NavLink>
          </NavSection>
        </Box>
        <Box>
          <NavSection title="AUTOMAÇÃO">
            <NavLink icon={RiInputMethodLine}>Formulário</NavLink>
            <NavLink icon={RiGitMergeLine}>Automação</NavLink>
          </NavSection>
          <Stack spacing="4" mt="8" align="stretch"></Stack>
        </Box>
      </Stack>
    </Box>
  );
}

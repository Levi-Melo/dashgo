import { Stack, Box } from "@chakra-ui/react";
import React from "react";
import {
  RiDashboardLine,
  RiContactsLine,
  RiInputMethodLine,
  RiGitMergeLine,
} from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <Box>
        <NavSection title="GERAL">
          <NavLink href="/dashboard" icon={RiDashboardLine}>
            Dashboard
          </NavLink>
          <NavLink href="/users" icon={RiContactsLine}>
            Usuários
          </NavLink>
        </NavSection>
      </Box>
      <Box>
        <NavSection title="AUTOMAÇÃO">
          <NavLink href="/forms" icon={RiInputMethodLine}>
            Formulário
          </NavLink>
          <NavLink href="/automation" icon={RiGitMergeLine}>
            Automação
          </NavLink>
        </NavSection>
        <Stack spacing="4" mt="8" align="stretch"></Stack>
      </Box>
    </Stack>
  );
}

import { Box, Button, Stack } from "@chakra-ui/react";
import React from "react";
import { PaginationIten } from "./PaginationIten";
export function Pagination() {
  return (
    <Stack
      direction="row"
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        <PaginationIten number={1} isCurrent />
        <PaginationIten number={2} />
        <PaginationIten number={3} />
      </Stack>
    </Stack>
  );
}

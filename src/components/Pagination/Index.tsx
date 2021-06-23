import { Box, Text, Stack } from "@chakra-ui/react";
import React from "react";
import { PaginationIten } from "./PaginationIten";

interface PaginationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (Page: number) => void;
}

function pagesArray(to: number, from: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountOfRegisters,
  registerPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const siblingsCount = 1;
  const lastPage = Math.floor(totalCountOfRegisters / registerPerPage);

  const previousPages =
    currentPage > 1
      ? pagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? pagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
      : [];

  return (
    <Stack
      direction={["column", "row"]}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationIten onPageChange={onPageChange} number={1} />
            {currentPage > 2 + siblingsCount && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}
        {previousPages.length > 0 &&
          previousPages.map((p) => {
            return (
              <PaginationIten onPageChange={onPageChange} key={p} number={p} />
            );
          })}
        <PaginationIten
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
        />
        {nextPages.length > 0 &&
          nextPages.map((p) => {
            return (
              <PaginationIten onPageChange={onPageChange} key={p} number={p} />
            );
          })}

        {currentPage + siblingsCount < lastPage && (
          <>
            <PaginationIten onPageChange={onPageChange} number={lastPage} />
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
}

import { Button } from "@chakra-ui/react";

interface PaginationitemProps {
  isCurrent?: boolean;
  number: number;
}

export function PaginationItem({ isCurrent, number }: PaginationitemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="orange"
        disabled
        _disabled={{ bg: "orange.500", cursor: "default" }}
      >
        {number}
      </Button>
    );
  }
  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.700"
      _hover={{ bg: "gray.500" }}
    >
      {number}
    </Button>
  );
}
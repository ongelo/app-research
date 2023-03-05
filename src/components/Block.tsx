import { ActionIcon, Box, Paper } from "@mantine/core";
import { PropsWithChildren } from "react";
import { Trash } from "tabler-icons-react";

interface Props extends PropsWithChildren {
  onDelete: () => void;
}

const Block: React.FC<Props> = ({ children, onDelete }) => {
  return (
    <Paper shadow="xs" p="md" withBorder pos="relative">
      <Box pos="absolute" top="0" right="-42px" px="xs">
        <ActionIcon onClick={onDelete}>
          <Trash size="1rem" />
        </ActionIcon>
      </Box>
      {children}
    </Paper>
  );
};

export default Block;

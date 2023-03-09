import { ActionIcon, Box, Tooltip } from "@mantine/core";
import React, { RefObject } from "react";
import { ArrowsMove, Trash } from "tabler-icons-react";

type Props = {
  dragRef: RefObject<HTMLButtonElement>;
  onDelete: () => void;
};

const BlockTools: React.FC<Props> = ({ dragRef, onDelete }) => {
  return (
    <Box pos="absolute" top="0" right="-32px" pl="xs">
      <Tooltip label="Delete">
        <ActionIcon onClick={onDelete}>
          <Trash size="1rem" />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Move">
        <ActionIcon ref={dragRef}>
          <ArrowsMove size="1rem" />
        </ActionIcon>
      </Tooltip>
    </Box>
  );
};

export default BlockTools;

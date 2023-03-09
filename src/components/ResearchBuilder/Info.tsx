import { ActionIcon, HoverCard, Text } from "@mantine/core";
import { InfoCircle } from "tabler-icons-react";

type Props = {
  text: string;
};

const Info: React.FC<Props> = ({ text }) => {
  return (
    <HoverCard shadow="md" openDelay={100} position="top">
      <HoverCard.Target>
        <ActionIcon color="blue">
          <InfoCircle size="1rem" />
        </ActionIcon>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Text size="sm">{text}</Text>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export default Info;

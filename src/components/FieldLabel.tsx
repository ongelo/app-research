import { Code, Flex, Text } from "@mantine/core";

type Props = {
  label: string;
  name: string;
};

const FieldLabel: React.FC<Props> = ({ label, name }) => {
  return (
    <Flex align="center">
      <Text>{label}</Text>&nbsp;(<Code>{name}</Code>)
    </Flex>
  );
};

export default FieldLabel;

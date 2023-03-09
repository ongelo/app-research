import { Header as MantineHeader, Text } from "@mantine/core";

const Header: React.FC = () => {
  return (
    <MantineHeader height={{ base: 50, md: 70 }} p="md">
      <Text>Research</Text>
    </MantineHeader>
  );
};

export default Header;

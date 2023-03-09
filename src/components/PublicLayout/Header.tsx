import { Header as MantineHeader, Text } from "@mantine/core";

const Header: React.FC = () => {
  return (
    <MantineHeader height={{ base: 50, md: 70 }} p="md">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Text>Research</Text>
      </div>
    </MantineHeader>
  );
};

export default Header;

import {
  Burger,
  Header as MantineHeader,
  MediaQuery,
  Text,
  useMantineTheme,
} from "@mantine/core";

type Props = {
  opened: boolean;
  toggle: () => void;
};

const Header: React.FC<Props> = ({ opened, toggle }) => {
  const theme = useMantineTheme();

  return (
    <MantineHeader height={{ base: 50, md: 70 }} p="md">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Text>Research Builder</Text>
      </div>
    </MantineHeader>
  );
};

export default Header;

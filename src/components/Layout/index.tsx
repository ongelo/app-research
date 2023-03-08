import { AppShell, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PropsWithChildren } from "react";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<Navbar opened={opened} />}
      header={<Header opened={opened} toggle={toggle} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Container size="sm" px="sm" pt="sm">
        {children}
      </Container>
    </AppShell>
  );
};

export default Layout;

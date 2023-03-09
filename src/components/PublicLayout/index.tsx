import { AppShell, Container } from "@mantine/core";
import { PropsWithChildren } from "react";
import Header from "./Header";

const PublicLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppShell
      header={<Header />}
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

export default PublicLayout;

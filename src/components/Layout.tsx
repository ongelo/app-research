import { Container } from "@mantine/core";
import { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container size="xs" px="sm" pt="xl">
      {children}
    </Container>
  );
};

export default Layout;

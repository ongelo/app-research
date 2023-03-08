import { Container } from "@mantine/core";
import { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container size="sm" px="sm" pt="xl" mt="xl">
      {children}
    </Container>
  );
};

export default Layout;

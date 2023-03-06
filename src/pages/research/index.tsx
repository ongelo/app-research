import Head from "@/components/Head";
import ResearchBuilder from "@/components/ResearchBuilder";
import { Container } from "@mantine/core";

const ResearchPage = () => {
  return (
    <>
      <Head title="Research" />
      <Container size="xs" px="sm" pt="xl">
        <ResearchBuilder />
      </Container>
    </>
  );
};

export default ResearchPage;

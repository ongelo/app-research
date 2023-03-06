import Head from "@/components/Head";
import ResearchPreview from "@/components/ResearchPreview";
import { Container } from "@mantine/core";

const ResearchPreviewPage = () => {
  return (
    <>
      <Head title="Research Preview" />
      <Container size="xs" px="sm" pt="xl">
        <ResearchPreview />
      </Container>
    </>
  );
};

export default ResearchPreviewPage;

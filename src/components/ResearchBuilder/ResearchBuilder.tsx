import { Title } from "@mantine/core";
import Form from "./FormResearchBuilder";

const ResearchBuilder = () => {
  return (
    <div>
      <Title order={1} mb="lg">
        Create a research
      </Title>
      <Form />
    </div>
  );
};

export default ResearchBuilder;

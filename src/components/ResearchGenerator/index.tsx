import { GenerateResearchRequest } from "@/backend/generateResearch";
import { Button, NumberInput, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useQueryClient } from "react-query";

const DEFAULT_TOPIC =
  "This research aims to compare people's tendency to order fast food based on the restaurant's logo color.";

const ResearchGenerator = () => {
  const queryClient = useQueryClient();
  const form = useForm<GenerateResearchRequest>({
    initialValues: {
      totalQuestions: 2,
      topic: DEFAULT_TOPIC,
    },
  });

  const handleSubmit = async (values: GenerateResearchRequest) => {
    await queryClient.fetchQuery({
      queryFn: async () => {
        const response = await axios.post("/api/generate", values);
        console.log({ response });
      },
      queryKey: "generate",
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing="lg" p="xl">
        <Title order={1}>Generate a research powered by AI</Title>
        <TextInput
          name="topic"
          label="Enter a research topic"
          size="lg"
          {...form.getInputProps("topic")}
        />
        <NumberInput
          name="totalQuestions"
          label="Enter number of questions to generate"
          size="lg"
          {...form.getInputProps("totalQuestions")}
        />
        <Button type="submit">Generate</Button>
      </Stack>
    </form>
  );
};

export default ResearchGenerator;

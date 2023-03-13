import { GeneratedFormField } from "@/backend/generateResearch";
import { GenerateResearchRequest } from "@/pages/api/generate";
import {
  Alert,
  Button,
  NumberInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { AlertCircle } from "tabler-icons-react";

const DEFAULT_TOPIC =
  "This research aims to compare people's tendency to order fast food based on the restaurant's logo color.";

type Props = {
  onAiGenerated: (generatedFormFields: GeneratedFormField[]) => void;
};

const generateFormFields = async (values: GenerateResearchRequest) => {
  const { data: fields } = await axios.post<GeneratedFormField[]>(
    "/api/generate",
    values
  );

  return fields;
};

const getErrorMessage = (error?: AxiosError) => {
  const errorData = error?.response?.data;
  if (errorData) {
    return (
      (errorData as { message?: string })?.message ??
      "Something went wrong. Please try again later."
    );
  }
};

const ResearchGenerator: React.FC<Props> = ({ onAiGenerated }) => {
  const { mutate, isLoading, error } = useMutation(
    "generate",
    generateFormFields,
    {
      onSuccess: onAiGenerated,
    }
  );
  const errorMessage = getErrorMessage(error as AxiosError);

  const form = useForm<GenerateResearchRequest>({
    initialValues: {
      totalQuestions: 2,
      topic: DEFAULT_TOPIC,
    },
  });

  const handleSubmit = async (values: GenerateResearchRequest) => {
    mutate(values);
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
          max={8}
          {...form.getInputProps("totalQuestions")}
        />
        {Boolean(errorMessage) && (
          <Alert
            icon={<AlertCircle size="1rem" />}
            title="Cannot generate research"
            color="red"
          >
            {errorMessage}
          </Alert>
        )}
        <Button type="submit" loading={isLoading}>
          Generate
        </Button>
      </Stack>
    </form>
  );
};

export default ResearchGenerator;

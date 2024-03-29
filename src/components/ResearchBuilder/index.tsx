import { GeneratedFormField } from "@/backend/generateResearch";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";
import { BlockType } from "../enums";
import FormResearchBuilder from "./FormResearchBuilder";
import ResearchGenerator from "./ResearchGenerator";

enum BuildOption {
  Ai,
  New,
  Load,
}

const validateResearchForm = (researchForm?: ResearchBuilderFormValues) => {
  if (
    researchForm &&
    (!researchForm.title ||
      !researchForm.blocks ||
      !Array.isArray(researchForm.blocks))
  ) {
    throw new Error("The saved data is invalid");
  }
};

const ResearchBuilder = () => {
  const [buildOption, setBuildOption] = useState<BuildOption | null>(null);
  const [aiGenerated, setAiGenerated] = useState<
    ResearchBuilderFormValues | undefined
  >(undefined);

  const [previousResearchForm, setResearchForm] = useLocalStorage<
    ResearchBuilderFormValues | undefined
  >({
    key: "researchForm",
  });

  const BLOCK_TYPES_MAP = {
    text: BlockType.InputText,
    radio: BlockType.InputSelect,
    select: BlockType.InputSelect,
  };

  const handleAiGenerated = (generatedFormFields: GeneratedFormField[]) => {
    setAiGenerated({
      title: "AI generated research",
      blocks: generatedFormFields.map((field) => ({
        id: field.id,
        type: BLOCK_TYPES_MAP[field.type],
        details: {
          label: field.label,
          options: field.options,
        },
      })),
    });
    setBuildOption(BuildOption.New);
  };

  if (buildOption === null) {
    return (
      <Stack>
        <Stack align="center">
          <Title>Create a research survey</Title>
          <Text>
            Create a research survey that you can share out to gather data from
            people.
          </Text>
        </Stack>
        <Group spacing="lg" position="center" pt="lg">
          <Button
            color="violet"
            size="lg"
            onClick={() => setBuildOption(BuildOption.Ai)}
          >
            Generate with AI
          </Button>
          <Button size="lg" onClick={() => setBuildOption(BuildOption.New)}>
            Create manually
          </Button>
        </Group>
        <Group spacing="lg" position="center">
          <Button
            variant="subtle"
            size="sm"
            onClick={() => setBuildOption(BuildOption.Load)}
          >
            Load previous
          </Button>
        </Group>
      </Stack>
    );
  }

  if (buildOption === BuildOption.Ai) {
    return <ResearchGenerator onAiGenerated={handleAiGenerated} />;
  }

  if (buildOption === BuildOption.Load) {
    return <FormResearchBuilder initialValues={previousResearchForm} />;
  }

  return <FormResearchBuilder initialValues={aiGenerated} />;
};

export default ResearchBuilder;

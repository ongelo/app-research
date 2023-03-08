import { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Box, Center, Stack, Title, TextInput } from "@mantine/core";
import { CirclePlus } from "tabler-icons-react";
import Block from "./Block";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  useDisclosure,
  useLocalStorage,
  useWindowScroll,
} from "@mantine/hooks";
import { BlockType } from "../enums";
import AlertSuccess from "../AlertSuccess";
import { INITIAL_BLOCKS } from "../constants";

const Form = () => {
  const [success, setSuccess] = useState(false);
  const form = useForm<ResearchBuilderFormValues>({
    initialValues: {
      title: "My research",
      blocks: INITIAL_BLOCKS,
    },
  });
  const [, setResearchForm] = useLocalStorage<ResearchBuilderFormValues>({
    key: "researchForm",
  });
  const [, scrollTo] = useWindowScroll();

  const [
    addBlockModalOpen,
    { open: openAddBlockModal, close: closeAddBlockModal },
  ] = useDisclosure(false);

  const handleSubmit = (values: ResearchBuilderFormValues) => {
    setResearchForm(values);
    setSuccess(true);
    scrollTo({ y: 0 });
  };

  const handleAddBlock = () => {
    const defaultBlock = {
      id: `id-${new Date().getMilliseconds()}`,
      type: BlockType.InputText,
      details: {
        label: "New input",
        placeholder: "",
      },
    };
    form.insertListItem("blocks", defaultBlock);
  };

  const handleDeleteBlock = (index: number) => {
    form.removeListItem("blocks", index);
  };

  const moveBlock = (fromIndex: number, toIndex: number) => {
    form.reorderListItem("blocks", { from: fromIndex, to: toIndex });
  };

  return (
    <>
      <Title order={1} mb="lg">
        <TextInput
          name="title"
          label="Research title"
          size="lg"
          {...form.getInputProps("title")}
        />
      </Title>

      {success && <AlertSuccess onClose={() => setSuccess(false)} />}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box pb={100}>
          <DndProvider backend={HTML5Backend}>
            <Stack spacing="lg">
              {form.values.blocks.map((block, index) => (
                <Block
                  key={block.id}
                  id={`blocks.${index}`}
                  index={index}
                  form={form}
                  onMove={moveBlock}
                  onDelete={() => handleDeleteBlock(index)}
                />
              ))}
            </Stack>
          </DndProvider>

          <Center h={100}>
            <Button
              leftIcon={<CirclePlus />}
              type="button"
              variant="light"
              onClick={handleAddBlock}
              fullWidth
            >
              Add question
            </Button>
          </Center>
        </Box>

        <Box pos="fixed" bottom={0} right={0} left={0}>
          <Button type="submit" size="xl" mt="sm" radius="xs" fullWidth>
            Save research
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Form;

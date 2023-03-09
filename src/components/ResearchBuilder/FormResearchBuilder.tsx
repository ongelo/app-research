import { useState } from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  Box,
  Center,
  Stack,
  Title,
  TextInput,
  Text,
  Divider,
  Group,
} from "@mantine/core";
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
import ModalResetConfirmation from "./ModalResetConfirmation";

type Props = {
  initialValues: ResearchBuilderFormValues | undefined;
};

const Form: React.FC<Props> = ({ initialValues }) => {
  const [success, setSuccess] = useState(false);

  const form = useForm<ResearchBuilderFormValues>({
    initialValues: initialValues ?? {
      title: "My research",
      blocks: INITIAL_BLOCKS,
    },
  });
  const [, setResearchForm] = useLocalStorage<ResearchBuilderFormValues>({
    key: "researchForm",
  });
  const [, scrollTo] = useWindowScroll();

  const [
    showResetConfirmation,
    { open: openResetConfirmation, close: closeResetConfirmation },
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

  const handleResetForm = () => {
    form.setValues({
      title: "",
      blocks: [],
    });
  };

  return (
    <>
      {success && <AlertSuccess onClose={() => setSuccess(false)} />}

      <Title mb="xs">Build your first research</Title>
      <Text c="gray.7" fz="sm">
        Add as many blocks as you want and customize them however you like. You
        can then save your form, and check out the preview before sharing it out
        with the world.
      </Text>

      <Divider my="lg" />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group position="right" mb="sm">
          <Button
            type="button"
            variant="outline"
            onClick={openResetConfirmation}
          >
            Reset
          </Button>
          <Button type="submit">Save</Button>
        </Group>

        <TextInput
          name="title"
          label="Research title"
          size="lg"
          mb="lg"
          {...form.getInputProps("title")}
        />

        <Box pb="xl">
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

          <Center h={80}>
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

        <Button type="submit" size="xl" mb="xl" fullWidth>
          Save research
        </Button>
      </form>

      {showResetConfirmation && (
        <ModalResetConfirmation
          onConfirm={handleResetForm}
          onClose={closeResetConfirmation}
        />
      )}
    </>
  );
};

export default Form;

import { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Box, Center, Stack } from "@mantine/core";
import { CirclePlus } from "tabler-icons-react";
import ModalAddBlock from "./ModalAddBlock";
import Block from "./Block";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  useDisclosure,
  useListState,
  useLocalStorage,
  useWindowScroll,
} from "@mantine/hooks";
import { BlockType } from "./enums";
import AlertSuccess from "./AlertSuccess";

const DEFAULT_CODE = `
const { name, age } = formValues;

let welcomeMessage = \`Hi there, \${name}!\`

if (age < 18) {
  welcomeMessage = \`\${welcomeMessage} You have to be 18+ to use this site.\`
} else {
  welcomeMessage = \`\${welcomeMessage} You are welcome to use this site.\`
}

console.log(welcomeMessage);
`;

const Form = () => {
  const [success, setSuccess] = useState(false);
  const form = useForm<FormValues>({
    initialValues: {
      code1: DEFAULT_CODE,
    },
  });
  const [, setResearchForm] = useLocalStorage<LiveBlock[]>({
    key: "researchForm",
  });
  const [, scrollTo] = useWindowScroll();

  const [blocks, blocksHandler] = useListState<Block>([
    {
      id: "descriptionOfResearch",
      type: BlockType.PlainText,
      details: {
        name: "descriptionOfResearch",
        label: "",
      },
    },
    {
      id: "name",
      type: BlockType.InputText,
      details: {
        name: "name",
        label: "Name",
        placeholder: "Oguz Obama",
      },
    },
    {
      id: "age",
      type: BlockType.InputNumber,
      details: {
        name: "age",
        label: "Age",
      },
    },
    {
      id: "code1",
      type: BlockType.InputCode,
      details: {
        name: "code1",
        formValues: {},
      },
    },
    {
      id: "gender",
      type: BlockType.InputSelect,
      details: {
        name: "gender",
        label: "Gender",
        options: ["Male", "Female"],
      },
    },
  ]);
  const [
    addBlockModalOpen,
    { open: openAddBlockModal, close: closeAddBlockModal },
  ] = useDisclosure(false);

  const handleSubmit = (values: FormValues) => {
    const researchForm: LiveBlock[] = blocks.map((block) => ({
      id: block.id,
      type: block.type,
      value: values[block.id],
      details: block.details,
    }));

    setResearchForm(researchForm);
    setSuccess(true);
    scrollTo({ y: 0 });
  };

  const handleAddField = (block: Block) => {
    blocksHandler.append(block);
  };

  const handleDeleteField = (blockIndexToDelete: number) => {
    blocksHandler.remove(blockIndexToDelete);
  };

  const moveBlock = (fromIndex: number, toIndex: number) => {
    blocksHandler.reorder({ from: fromIndex, to: toIndex });
  };

  return (
    <>
      {success && <AlertSuccess onClose={() => setSuccess(false)} />}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box pb={100}>
          <DndProvider backend={HTML5Backend}>
            <Stack spacing="lg">
              {blocks.map((block, index) => (
                <Block
                  key={block.id}
                  index={index}
                  block={block}
                  form={form}
                  onMove={moveBlock}
                  onDelete={() => handleDeleteField(index)}
                />
              ))}
            </Stack>
          </DndProvider>

          <Center h={100}>
            <Button
              type="button"
              variant="gradient"
              gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
              fullWidth
              onClick={openAddBlockModal}
            >
              <CirclePlus size="2em" />
            </Button>
          </Center>
        </Box>

        <Box pos="fixed" bottom={0} right={0} left={0}>
          <Button type="submit" size="xl" mt="sm" radius="xs" fullWidth>
            Save research
          </Button>
        </Box>
      </form>

      {addBlockModalOpen && (
        <ModalAddBlock onSave={handleAddField} onClose={closeAddBlockModal} />
      )}
    </>
  );
};

export default Form;

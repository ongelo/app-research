import { Button, Modal, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { BlockType } from "./enums";

interface AddFieldFormValues extends Omit<InputProps, "form"> {
  blockType: BlockType;
}

type Props = {
  onClose: () => void;
  onSave: (block: Block) => void;
};

const isCodeInputType = (type: BlockType) => type === BlockType.InputCode;
const isPlainTextType = (type: BlockType) => type === BlockType.PlainText;

const ModalAddField: React.FC<Props> = ({ onSave, onClose }) => {
  const form = useForm<AddFieldFormValues>({
    initialValues: {
      blockType: BlockType.InputText,
      name: "",
      label: "",
      placeholder: "",
    },
    validate: ({ blockType, name, label }) => ({
      name: !name ? "Field must have an identifier" : null,
      label:
        !isCodeInputType(blockType) && !isPlainTextType(blockType) && !label
          ? "Field must have a label"
          : null,
    }),
  });

  const handleSubmit = (values: AddFieldFormValues) => {
    onSave({
      id: values.name,
      type: values.blockType,
      details: {
        ...values,
      },
    });
    onClose();
  };

  return (
    <Modal opened title="Add block" size="md" centered onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="lg">
          <Select
            name="blockType"
            label="Block type"
            data={[
              { value: BlockType.InputText, label: "Text input" },
              { value: BlockType.InputNumber, label: "Number input" },
              { value: BlockType.InputCode, label: "Custom code" },
              { value: BlockType.PlainText, label: "Plain text" },
            ]}
            {...form.getInputProps("blockType")}
          />

          <TextInput
            name="name"
            label="Field identifier"
            placeholder="personName"
            {...form.getInputProps("name")}
          />

          {!isCodeInputType(form.values.blockType) &&
            !isPlainTextType(form.values.blockType) && (
              <>
                <TextInput
                  name="label"
                  label="Field label"
                  placeholder="Enter person name"
                  {...form.getInputProps("label")}
                />
                <TextInput
                  name="placeholder"
                  label="Field placeholder"
                  placeholder="Jack Smith"
                  {...form.getInputProps("placeholder")}
                />
              </>
            )}

          <Button type="submit" size="xl" mt="sm" fullWidth>
            Add block
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default ModalAddField;

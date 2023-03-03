import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Field, FieldType } from "./Form";

type AddFieldFormValues = Omit<FieldProps, "form">;

type Props = {
  onClose: () => void;
  onSave: (field: Field) => void;
};

const ModalAddField: React.FC<Props> = ({ onSave, onClose }) => {
  const form = useForm<AddFieldFormValues>({
    initialValues: { name: "", label: "", placeholder: "" },
    validate: {
      name: (value) => (!value ? "Field must have an identifier" : null),
      label: (value) => (!value ? "Field must have a label" : null),
    },
  });

  const handleSubmit = (values: AddFieldFormValues) => {
    onSave({
      type: FieldType.Text,
      props: {
        ...values,
      },
    });
    onClose();
  };
  return (
    <Modal opened title="Add field" size="md" centered onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="lg">
          <TextInput
            label="Field identifier"
            placeholder="personName"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Field label"
            placeholder="Enter person name"
            {...form.getInputProps("label")}
          />
          <TextInput
            label="Field placeholder"
            placeholder="Jack Smith"
            {...form.getInputProps("placeholder")}
          />
          <Button type="submit" size="xl" mt="sm" fullWidth>
            Save research
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default ModalAddField;

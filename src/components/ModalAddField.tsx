import { Button, Modal, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Field, FieldType } from "./Form";

interface AddFieldFormValues extends Omit<FieldProps, "form"> {
  fieldType: FieldType;
}

type Props = {
  onClose: () => void;
  onSave: (field: Field) => void;
};

const isCodeFieldType = (type: FieldType) => type === FieldType.Code;

const ModalAddField: React.FC<Props> = ({ onSave, onClose }) => {
  const form = useForm<AddFieldFormValues>({
    initialValues: {
      fieldType: FieldType.Text,
      name: "",
      label: "",
      placeholder: "",
    },
    validate: ({ fieldType, name, label }) =>
      isCodeFieldType(fieldType)
        ? {}
        : {
            name: !name ? "Field must have an identifier" : null,
            label: !label ? "Field must have a label" : null,
          },
  });

  const handleSubmit = (values: AddFieldFormValues) => {
    onSave({
      key: values.name,
      type: values.fieldType,
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
          <Select
            name="fieldType"
            label="Field type"
            data={[
              { value: FieldType.Text, label: "Text input" },
              { value: FieldType.Number, label: "Number input" },
              { value: FieldType.Code, label: "Custom code" },
            ]}
            {...form.getInputProps("fieldType")}
          />

          {!isCodeFieldType(form.values.fieldType) && (
            <>
              <TextInput
                name="name"
                label="Field identifier"
                placeholder="personName"
                {...form.getInputProps("name")}
              />
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
            Add field
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default ModalAddField;
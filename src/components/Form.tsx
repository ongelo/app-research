import { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Box, Center, Stack } from "@mantine/core";
import CodeEditor, { CodeEditorProps } from "./CodeEditor";
import FieldText from "./FieldText";
import { CirclePlus } from "tabler-icons-react";
import FieldNumber from "./FieldNumber";
import ModalAddField from "./ModalAddField";
import Block from "./Block";

export enum FieldType {
  Text = "text",
  Number = "number",
  Code = "code",
}

type RegularFieldProps = Omit<FieldProps, "form">;
export interface Field {
  key: string;
  type: FieldType;
  props: RegularFieldProps | CodeEditorProps;
}

const Form = () => {
  const form = useForm<FormValues>();

  const [fields, setFields] = useState<Field[]>([
    {
      key: "name",
      type: FieldType.Text,
      props: {
        name: "name",
        label: "Name",
        placeholder: "Oguz Obama",
      },
    },
    {
      key: "age",
      type: FieldType.Number,
      props: {
        name: "age",
        label: "Age",
        placeholder: "",
      },
    },
    {
      key: `code-${new Date().getTime()}`,
      type: FieldType.Code,
      props: {
        formValues: {},
      },
    },
  ]);
  const [showAddFieldForm, setShowAddFieldForm] = useState<boolean>(false);

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  const handleAddField = (field: Field) => {
    setFields([...fields, field]);
  };

  const handleDeleteField = (fieldKeyToDelete: string) => {
    const updatedFields = fields.filter(
      (field) => field.key !== fieldKeyToDelete
    );
    setFields(updatedFields);
  };

  const getFieldComponent = ({ type, props }: Field) => {
    switch (type) {
      case FieldType.Text:
        props = props as RegularFieldProps;
        return <FieldText form={form} {...props} />;
      case FieldType.Number:
        props = props as RegularFieldProps;
        return <FieldNumber form={form} {...props} />;
      case FieldType.Code:
        return <CodeEditor formValues={form.values} />;
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box pb={100}>
          <Stack spacing="lg">
            {fields.map((field) => (
              <Block
                key={field.key}
                onDelete={() => handleDeleteField(field.key)}
              >
                {getFieldComponent(field)}
              </Block>
            ))}
          </Stack>

          <Center h={100}>
            <Button
              type="button"
              color="green.7"
              fullWidth
              onClick={() => setShowAddFieldForm(true)}
            >
              <CirclePlus size="2em" />
            </Button>
          </Center>
        </Box>

        <Box pos="fixed" bottom={0} right={0} left={0}>
          <Button type="submit" size="xl" mt="sm" fullWidth>
            Save research
          </Button>
        </Box>
      </form>

      {showAddFieldForm && (
        <ModalAddField
          onSave={handleAddField}
          onClose={() => setShowAddFieldForm(false)}
        />
      )}
    </>
  );
};

export default Form;

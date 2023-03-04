import { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Divider, Box, Center, Stack } from "@mantine/core";
import CodeEditor, { CodeEditorProps } from "./CodeEditor";
import FieldText from "./FieldText";
import { CirclePlus } from "tabler-icons-react";
import FieldNumber from "./FieldNumber";
import ModalAddField from "./ModalAddField";

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
      key: "code",
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

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box pb={100}>
          <Stack spacing="lg">
            {fields.map(({ key, type, props }) => {
              switch (type) {
                case FieldType.Text:
                  props = props as RegularFieldProps;
                  return <FieldText key={key} form={form} {...props} />;
                case FieldType.Number:
                  props = props as RegularFieldProps;
                  return <FieldNumber key={key} form={form} {...props} />;
                case FieldType.Code:
                  return <CodeEditor key={key} formValues={form.values} />;
              }
            })}
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

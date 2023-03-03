import { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Divider, Box, Center, Stack } from "@mantine/core";
import CodeEditor from "./CodeEditor";
import FieldText from "./FieldText";
import { CirclePlus } from "tabler-icons-react";
import FieldNumber from "./FieldNumber";
import ModalAddField from "./ModalAddField";

export enum FieldType {
  Text,
  Number,
}

export interface Field {
  type: FieldType;
  props: Omit<FieldProps, "form">;
}

const Form = () => {
  const form = useForm<FormValues>({
    initialValues: { name: "", age: 0 },
  });

  const [fields, setFields] = useState<Field[]>([
    {
      type: FieldType.Text,
      props: {
        name: "name",
        label: "Name",
        placeholder: "Oguz Obama",
      },
    },
    {
      type: FieldType.Number,
      props: {
        name: "age",
        label: "Age",
        placeholder: "",
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
      <CodeEditor formValues={form.values} />
      <Divider size="md" my="xl" />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="lg">
          {fields.map(({ type, props }) => {
            switch (type) {
              case FieldType.Text:
                return <FieldText key={props.name} form={form} {...props} />;
              case FieldType.Number:
                return <FieldNumber key={props.name} form={form} {...props} />;
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

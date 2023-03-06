import { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Box, Center, Stack } from "@mantine/core";
import CodeEditor from "./CodeEditor";
import FieldText from "./FieldText";
import { CirclePlus } from "tabler-icons-react";
import FieldNumber from "./FieldNumber";
import ModalAddField from "./ModalAddField";
import Block from "./Block";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useListState, useLocalStorage, useWindowScroll } from "@mantine/hooks";
import { FieldType } from "./enums";
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
  const [, setResearchForm] = useLocalStorage<ResearchForm[]>({
    key: "researchForm",
  });
  const [, scrollTo] = useWindowScroll();

  const [fields, fieldsHandler] = useListState<Field>([
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
      key: "code1",
      type: FieldType.Code,
      props: {
        name: "code1",
        label: "",
        placeholder: "",
      },
    },
  ]);
  const [showAddFieldForm, setShowAddFieldForm] = useState<boolean>(false);

  const handleSubmit = (values: FormValues) => {
    const researchForm: ResearchForm[] = fields.map((field) => ({
      key: field.key,
      type: field.type,
      value: values[field.key],
    }));

    setResearchForm(researchForm);
    setSuccess(true);
    scrollTo({ y: 0 });
  };

  const handleAddField = (field: Field) => {
    fieldsHandler.append(field);
  };

  const handleDeleteField = (fieldIndexToDelete: number) => {
    fieldsHandler.remove(fieldIndexToDelete);
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
        return <CodeEditor formValues={form.values} form={form} {...props} />;
    }
  };

  const moveCard = (fromIndex: number, toIndex: number) => {
    fieldsHandler.reorder({ from: fromIndex, to: toIndex });
  };

  return (
    <>
      {success && <AlertSuccess onClose={() => setSuccess(false)} />}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box pb={100}>
          <DndProvider backend={HTML5Backend}>
            <Stack spacing="lg">
              {fields.map((field, index) => (
                <Block
                  key={field.key}
                  id={field.key}
                  index={index}
                  onMove={moveCard}
                  onDelete={() => handleDeleteField(index)}
                >
                  {getFieldComponent(field)}
                </Block>
              ))}
            </Stack>
          </DndProvider>

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

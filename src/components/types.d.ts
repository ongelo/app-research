type MantineStyleProps = import("@mantine/core").MantineStyleSystemProps;

type FormValues = {
  [key: string]: string | number;
};

interface InputProps extends MantineStyleProps {
  name: string;
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
  label: string;
  placeholder: string;
}

type CodeEditorProps = {
  name: string;
  formValues: FormValues;
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
};

type ResearchForm = {
  key: string;
  type: FieldType;
  value: string | number | null;
};

type InputDetails = Omit<InputProps, "form">;
type CodeEditorDetails = Omit<CodeEditorProps, "form">;

type Block = {
  id: string;
  type: BlockType;
  details: InputDetails | CodeEditorDetails;
};

type MantineStyleProps = import("@mantine/core").MantineStyleSystemProps;

type FormValues = {
  [key: string]: string | number;
};

interface InputProps extends MantineStyleProps {
  name: string;
  form: Form;
  label: string;
  placeholder?: string;
}

interface SelectInputProps extends InputProps {
  options: string[];
}

type CodeEditorProps = {
  name: string;
  formValues: FormValues;
  form: Form;
};

type LiveBlock = {
  id: string;
  type: BlockType;
  value: string | number | null;
  details: InputDetails | CodeEditorDetails | SelectInputDetails;
};

type InputDetails = Omit<InputProps, "form">;
type SelectInputDetails = Omit<SelectInputProps, "form">;
type CodeEditorDetails = Omit<CodeEditorProps, "form">;

type Block = {
  id: string;
  type: BlockType;
  details: InputDetails | CodeEditorDetails | SelectInputDetails;
};

type Form = Form;

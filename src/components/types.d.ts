type MantineStyleProps = import("@mantine/core").MantineStyleSystemProps;

type FormValues = {
  [key: string]: string | number;
};

interface FieldProps extends MantineStyleProps {
  name: string;
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
  label: string;
  placeholder: string;
}

type RegularFieldProps = Omit<FieldProps, "form">;
interface Field {
  key: string;
  type: FieldType;
  props: RegularFieldProps | CodeEditorProps;
}

type ResearchForm = {
  key: string;
  type: FieldType;
  value: string | number | null;
};

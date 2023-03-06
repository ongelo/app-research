type MantineStyleProps = import("@mantine/core").MantineStyleSystemProps;

type FormValues = {
  [key: string]: string | number;
};

enum FieldType {
  Text = "text",
  Number = "number",
  Code = "code",
}

interface FieldProps extends MantineStyleProps {
  name: string;
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
  label: string;
  placeholder: string;
}

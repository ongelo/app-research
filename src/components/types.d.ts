type MantineStyleProps = import("@mantine/core").MantineStyleSystemProps;

type FormValues = {
  name: string;
  age: number;
};

interface FieldProps extends MantineStyleProps {
  name: string;
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
  label: string;
  placeholder: string;
}

import { MantineStyleSystemProps, NumberInput, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form/lib/types";

interface Props extends MantineStyleSystemProps {
  name: string;
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
  label: string;
  placeholder: string;
}

const FieldNumber: React.FC<Props> = ({
  name,
  form,
  label,
  placeholder,
  ...rest
}) => {
  return (
    <NumberInput
      label={label}
      placeholder={placeholder}
      min={0}
      max={99}
      size="lg"
      {...form.getInputProps(name)}
      {...rest}
    />
  );
};

export default FieldNumber;

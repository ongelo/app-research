import { MantineStyleSystemProps, NumberInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form/lib/types";
import FieldLabel from "./FieldLabel";

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
      label={<FieldLabel label={label} name={name} />}
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

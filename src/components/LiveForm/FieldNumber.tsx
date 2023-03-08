import { NumberInput } from "@mantine/core";

const FieldNumber: React.FC<InputProps> = ({
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

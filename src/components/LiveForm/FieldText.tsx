import { TextInput } from "@mantine/core";

const FieldText: React.FC<InputProps> = ({
  name,
  form,
  label,
  placeholder,
  ...rest
}) => {
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      size="lg"
      {...form.getInputProps(name)}
      {...rest}
    />
  );
};

export default FieldText;

import { TextInput } from "@mantine/core";
import FieldLabel from "./FieldLabel";

const FieldText: React.FC<InputProps> = ({
  name,
  form,
  label,
  placeholder,
  ...rest
}) => {
  return (
    <TextInput
      label={<FieldLabel label={label} name={name} />}
      placeholder={placeholder}
      size="lg"
      {...form.getInputProps(name)}
      {...rest}
    />
  );
};

export default FieldText;

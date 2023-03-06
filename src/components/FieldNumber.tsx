import { NumberInput } from "@mantine/core";
import FieldLabel from "./FieldLabel";

const FieldNumber: React.FC<InputProps> = ({
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

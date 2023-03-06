import { NativeSelect } from "@mantine/core";
import FieldLabel from "./FieldLabel";

const FieldSelect: React.FC<SelectInputProps> = ({
  name,
  form,
  label,
  placeholder,
  options,
  ...rest
}) => {
  return (
    <NativeSelect
      data={options}
      label={<FieldLabel label={label} name={name} />}
      placeholder={placeholder}
      size="lg"
      {...form.getInputProps(name)}
      {...rest}
    />
  );
};

export default FieldSelect;

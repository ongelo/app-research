import { NativeSelect } from "@mantine/core";

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
      label={label}
      placeholder={placeholder}
      size="lg"
      {...form.getInputProps(name)}
      {...rest}
    />
  );
};

export default FieldSelect;

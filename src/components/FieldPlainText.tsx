import { Textarea } from "@mantine/core";

const FieldPlainText: React.FC<InputProps> = ({ name, form, ...rest }) => {
  return (
    <Textarea
      name={name}
      {...form.getInputProps(name)}
      {...rest}
      label="Enter plain text"
      placeholder="This research is about something really important."
    />
  );
};

export default FieldPlainText;

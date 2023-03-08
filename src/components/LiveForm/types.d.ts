interface InputProps extends MantineStyleProps {
  name: string;
  form: UseFormReturnType<LiveFormValues>;
  label: string;
  placeholder?: string;
}

interface SelectInputProps extends InputProps {
  options?: string[];
}

type CodeEditorProps = {
  name: string;
  form: UseFormReturnType<LiveFormValues>;
};

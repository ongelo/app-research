import type { UseFormReturnType } from "@mantine/form";
import CodeEditor from "./CodeEditor";
import { FieldType } from "./enums";
import FieldNumber from "./FieldNumber";
import FieldText from "./FieldText";

type Props = {
  block: Block;
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
};

const BlockContent: React.FC<Props> = ({ block: { type, details }, form }) => {
  switch (type) {
    case FieldType.Text: {
      const props = details as InputDetails;
      return <FieldText form={form} {...props} />;
    }
    case FieldType.Number: {
      const props = details as InputDetails;
      return <FieldNumber form={form} {...props} />;
    }
    case FieldType.Code: {
      const props = details as CodeEditorDetails;
      return <CodeEditor form={form} {...props} formValues={form.values} />;
    }
    default:
      return null;
  }
};

export default BlockContent;

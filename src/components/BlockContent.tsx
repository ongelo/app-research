import type { UseFormReturnType } from "@mantine/form";
import CodeEditor from "./CodeEditor";
import { BlockType } from "./enums";
import FieldNumber from "./FieldNumber";
import FieldPlainText from "./FieldPlainText";
import FieldSelect from "./FieldSelect";
import FieldText from "./FieldText";

type Props = {
  block: Block;
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
};

const BlockContent: React.FC<Props> = ({ block: { type, details }, form }) => {
  switch (type) {
    case BlockType.InputText: {
      const props = details as InputDetails;
      return <FieldText form={form} {...props} />;
    }
    case BlockType.InputNumber: {
      const props = details as InputDetails;
      return <FieldNumber form={form} {...props} />;
    }
    case BlockType.InputCode: {
      const props = details as CodeEditorDetails;
      return <CodeEditor form={form} {...props} formValues={form.values} />;
    }
    case BlockType.PlainText: {
      const props = details as InputDetails;
      return <FieldPlainText form={form} {...props} />;
    }
    case BlockType.InputSelect: {
      const props = details as SelectInputDetails;
      return <FieldSelect form={form} {...props} />;
    }
    default:
      return null;
  }
};

// TODO Could probably memoize this with `type`
export default BlockContent;

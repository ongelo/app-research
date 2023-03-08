import { Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { BlockType } from "../enums";
import CodeOutput from "./CodeOutput";
import FieldNumber from "./FieldNumber";
import FieldSelect from "./FieldSelect";
import FieldText from "./FieldText";

type Props = {
  block: Block;
  form: UseFormReturnType<LiveFormValues>;
};

const LiveBlockContent: React.FC<Props> = ({
  block: { id, type, details },
  form,
}) => {
  switch (type) {
    case BlockType.InputText: {
      return <FieldText name={id} form={form} {...(details as InputDetails)} />;
    }
    case BlockType.InputNumber: {
      return (
        <FieldNumber name={id} form={form} {...(details as InputDetails)} />
      );
    }
    case BlockType.InputCode: {
      return (
        <CodeOutput
          code={(details as CodeInputDetails).code}
          formValues={form.values}
        />
      );
    }
    case BlockType.PlainText: {
      return <Text>{(details as TextDetails).text}</Text>;
    }
    case BlockType.InputSelect: {
      return (
        <FieldSelect
          name={id}
          form={form}
          {...(details as SelectInputDetails)}
        />
      );
    }
    default:
      return null;
  }
};

// TODO Could probably memoize this with `type`
export default LiveBlockContent;

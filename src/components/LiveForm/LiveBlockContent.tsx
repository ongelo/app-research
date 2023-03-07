import { Text } from "@mantine/core";
import { BlockType } from "../enums";
import FieldNumber from "../FieldNumber";
import FieldSelect from "../FieldSelect";
import FieldText from "../FieldText";
import LiveCodeBlock from "./LiveCodeBlock";

type Props = {
  block: LiveBlock;
  form: Form;
};

const LiveBlockContent: React.FC<Props> = ({
  block: { type, value, details },
  form,
}) => {
  switch (type) {
    case BlockType.InputText: {
      return <FieldText form={form} {...(details as InputDetails)} />;
    }
    case BlockType.InputNumber: {
      return <FieldNumber form={form} {...(details as InputDetails)} />;
    }
    case BlockType.InputCode: {
      return <LiveCodeBlock code={value} />;
    }
    case BlockType.PlainText: {
      return <Text>{value}</Text>;
    }
    case BlockType.InputSelect: {
      return <FieldSelect form={form} {...(details as SelectInputDetails)} />;
    }
    default:
      return null;
  }
};

// TODO Could probably memoize this with `type`
export default LiveBlockContent;

import { UseFormReturnType } from "@mantine/form";
import LiveBlockContent from "./LiveBlockContent";

type Props = {
  form: UseFormReturnType<LiveFormValues>;
  block: Block;
};

const LiveBlock: React.FC<Props> = ({ form, block }) => {
  return <LiveBlockContent block={block} form={form} />;
};

export default LiveBlock;

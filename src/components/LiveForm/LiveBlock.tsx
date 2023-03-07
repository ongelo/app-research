import LiveBlockContent from "./LiveBlockContent";

type Props = {
  form: Form;
  block: LiveBlock;
};

const LiveBlock: React.FC<Props> = ({ form, block }) => {
  return <LiveBlockContent block={block} form={form} />;
};

export default LiveBlock;

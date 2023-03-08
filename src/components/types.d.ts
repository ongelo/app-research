type MantineStyleProps = import("@mantine/core").MantineStyleSystemProps;

type ResearchBuilderFormValues = {
  title: string;
  blocks: Block[];
};

type LiveFormValues = {
  [key: string]: string | number;
};

interface InputDetails {
  label: string;
  placeholder?: string;
}

interface SelectInputDetails extends InputDetails {
  options?: string[];
}

interface CodeInputDetails {
  code: string;
}

interface TextDetails {
  text: string;
}

type BlockDetails =
  | InputDetails
  | SelectInputDetails
  | CodeInputDetails
  | TextDetails;

type Block = {
  id: string;
  type: BlockType;
  details?: BlockDetails;
};

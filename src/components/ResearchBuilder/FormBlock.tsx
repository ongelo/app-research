import { Grid, Select, Stack, Textarea, TextInput } from "@mantine/core";
import CodeEditor from "./CodeEditor";
import { BlockType } from "../enums";
import { UseFormReturnType } from "@mantine/form";

type Props = {
  id: string;
  form: UseFormReturnType<ResearchBuilderFormValues>;
};

const isCodeInputType = (type: BlockType) => type === BlockType.InputCode;
const isPlainTextType = (type: BlockType) => type === BlockType.PlainText;
const isSelectInputType = (type: BlockType) => type === BlockType.InputSelect;

const FormBlock: React.FC<Props> = ({ id, form }) => {
  const blockType = form.getInputProps(`${id}.type`).value;
  return (
    <Grid>
      <Grid.Col span={12}>
        <Select
          name={`${id}.type`}
          label="Question type"
          data={[
            { value: BlockType.InputText, label: "Text input" },
            { value: BlockType.InputNumber, label: "Number input" },
            { value: BlockType.InputCode, label: "Custom code" },
            { value: BlockType.InputSelect, label: "Select input" },
            { value: BlockType.PlainText, label: "Plain text" },
          ]}
          {...form.getInputProps(`${id}.type`)}
        />
      </Grid.Col>

      <Grid.Col span={12}>
        <TextInput
          name={`${id}.id`}
          label="Question ID"
          placeholder="personName"
          {...form.getInputProps(`${id}.id`)}
        />
      </Grid.Col>

      {!isCodeInputType(blockType) && !isPlainTextType(blockType) && (
        <>
          <Grid.Col span={6}>
            <TextInput
              name={`${id}.details.label`}
              label="Question label"
              placeholder="Enter person name"
              {...form.getInputProps(`${id}.details.label`)}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              name={`${id}.details.placeholder`}
              label="Question placeholder"
              placeholder="Jack Smith"
              {...form.getInputProps(`${id}.details.placeholder`)}
            />
          </Grid.Col>
        </>
      )}

      {isSelectInputType(blockType) && (
        <Grid.Col span={6}>
          <TextInput
            name={`${id}.details.selectOption`}
            label="Enter a select option"
            placeholder="Jack Smith"
            {...form.getInputProps(`${id}.details.selectOption`)}
          />
        </Grid.Col>
      )}

      {isCodeInputType(blockType) && (
        <Grid.Col span={12}>
          <CodeEditor name={`${id}.details.code`} form={form} />
        </Grid.Col>
      )}

      {isPlainTextType(blockType) && (
        <Grid.Col span={12}>
          <Textarea
            name={`${id}.details.text`}
            label="Enter plain text"
            placeholder="This research is about something really important."
            {...form.getInputProps(`${id}.details.text`)}
          />
        </Grid.Col>
      )}
    </Grid>
  );
};

export default FormBlock;

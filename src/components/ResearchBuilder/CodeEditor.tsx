import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";
import { Code, Text } from "@mantine/core";

const ReactCodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

const CodeEditor: React.FC<CodeEditorProps> = ({ name, form }) => {
  const inputProps = form.getInputProps(name);

  return (
    <>
      <Text size="sm">
        Here you have access to your form values! 💻 Use <Code>formValues</Code>{" "}
        object to refer to your form values by their identifier (e.g.{" "}
        <Code>formValues.personName</Code>). Make sure to <Code>return</Code> a
        primitive value (e.g. <Code>string</Code>).
      </Text>
      <ReactCodeEditor
        language="js"
        placeholder="Please enter JS code."
        padding={12}
        style={{
          marginTop: 12,
          marginBottom: 12,
          fontSize: 12,
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
        {...inputProps}
      />
    </>
  );
};

export default CodeEditor;

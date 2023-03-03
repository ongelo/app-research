import { useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";
import { Button, Text } from "@mantine/core";

const ReactCodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

type Props = {
  formValues: FormValues;
};

const CodeEditor: React.FC<Props> = ({ formValues }) => {
  const [code, setCode] = useState(
    `function main(formValues) {
    console.log('Name field value: ', formValues.name);
    console.log('Age field value: ', formValues.age);\n}`
  );

  const handleSubmit = () => {
    const codeWrapper = () => `{ return ${code} };`;
    const func = new Function(codeWrapper());
    func()(formValues);
  };

  return (
    <>
      <Text mb="xs">Here you have access to your form values! 💻</Text>
      <ReactCodeEditor
        value={code}
        language="js"
        placeholder="Please enter JS code."
        onChange={(event) => setCode(event.target.value)}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />
      <Button mt="md" onClick={handleSubmit}>
        Submit code
      </Button>
    </>
  );
};

export default CodeEditor;

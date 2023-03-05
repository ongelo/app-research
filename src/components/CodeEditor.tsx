import { useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";
import { Button, Code, Text } from "@mantine/core";
import Block from "./Block";

const DEFAULT_CODE = `
const { name, age } = formValues;

let welcomeMessage = \`Hi there, \${name}!\`

if (age < 18) {
  welcomeMessage = \`\${welcomeMessage} You have to be 18+ to use this site.\`
} else {
  welcomeMessage = \`\${welcomeMessage} You are welcome to use this site.\`
}

console.log(welcomeMessage);
`;

const ReactCodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

export type CodeEditorProps = {
  formValues: FormValues;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ formValues }) => {
  const [code, setCode] = useState(DEFAULT_CODE);

  const handleSubmit = () => {
    const codeWrapper = () => `{
        return function main(formValues) { ${code} };
    }`;
    const func = new Function(codeWrapper());
    func()(formValues);
  };

  return (
    <>
      <Text size="sm">
        Here you have access to your form values! 💻 Use <Code>formValues</Code>{" "}
        object to refer to your form values by their identifier (e.g.{" "}
        <Code>formValues.personName</Code>).
      </Text>
      <ReactCodeEditor
        value={code}
        language="js"
        placeholder="Please enter JS code."
        onChange={(event) => setCode(event.target.value)}
        padding={12}
        style={{
          marginTop: 12,
          marginBottom: 12,
          fontSize: 12,
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />
      <Button onClick={handleSubmit}>Submit code</Button>
    </>
  );
};

export default CodeEditor;

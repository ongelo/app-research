import { Paper } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";

type Props = {
  code: string | number | null;
  formValues: LiveFormValues;
};

const CodeOutput: React.FC<Props> = ({ code, formValues }) => {
  const [codeResult, setCodeResult] = useState("");

  const run = useCallback(() => {
    const codeWrapper = () => `{
            return function main(formValues) { ${code} };
        }`;
    const func = new Function(codeWrapper());
    const result = func()(formValues);
    setCodeResult(result);
  }, [code, formValues]);

  useEffect(() => {
    if (formValues) {
      run();
    }
  }, [formValues, run]);

  if (!codeResult) {
    return null;
  }

  return (
    <Paper withBorder p="lg">
      {codeResult}
    </Paper>
  );
};

export default CodeOutput;

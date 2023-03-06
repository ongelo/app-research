import { useLocalStorage } from "@mantine/hooks";

const ResearchPreview = () => {
  const [researchForm, _] = useLocalStorage<FormValues>({
    key: "researchForm",
  });

  return <span>{JSON.stringify(researchForm, null, 4)}</span>;
};

export default ResearchPreview;

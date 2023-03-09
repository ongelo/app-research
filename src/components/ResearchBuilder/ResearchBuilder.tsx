import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import FormResearchBuilder from "./FormResearchBuilder";

const ResearchBuilder = () => {
  const [showForm, setShowForm] = useState(false);

  const [researchForm, _] = useLocalStorage<
    ResearchBuilderFormValues | undefined
  >({
    key: "researchForm",
  });

  useEffect(() => {
    const waitAndSetShowForm = () => {
      if (researchForm) {
        setShowForm(true);
      } else {
        setTimeout(() => setShowForm(true), 1000);
      }
    };

    waitAndSetShowForm();
  }, [researchForm]);

  return showForm ? <FormResearchBuilder initialValues={researchForm} /> : null;
};

export default ResearchBuilder;

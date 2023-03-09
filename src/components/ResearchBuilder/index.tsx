import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import FormResearchBuilder from "./FormResearchBuilder";

const validateResearchForm = (researchForm?: ResearchBuilderFormValues) => {
  if (
    researchForm &&
    (!researchForm.title ||
      !researchForm.blocks ||
      !Array.isArray(researchForm.blocks))
  ) {
    throw new Error("The saved data is invalid");
  }
};

const ResearchBuilder = () => {
  const [showForm, setShowForm] = useState(false);

  const [researchForm, setResearchForm] = useLocalStorage<
    ResearchBuilderFormValues | undefined
  >({
    key: "researchForm",
  });

  useEffect(() => {
    const waitAndSetShowForm = () => {
      try {
        validateResearchForm(researchForm);
        if (researchForm) {
          setShowForm(true);
        } else {
          setTimeout(() => setShowForm(true), 1000);
        }
      } catch (ex) {
        setResearchForm(undefined);
      }
    };

    waitAndSetShowForm();
  }, [researchForm, setResearchForm]);

  return showForm ? <FormResearchBuilder initialValues={researchForm} /> : null;
};

export default ResearchBuilder;

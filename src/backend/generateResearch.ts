import openai from "./openai";

const generateOpenAiPrompt = ({
  totalQuestions,
  topic,
}: GenerateResearchRequest) =>
  `Create a research survey that consists of ${totalQuestions} questions in the form of text input, radio options or dropdown (select) options. The topic of this research is "${topic}". Response should be an array of questions where each question should be in valid JSON format consisting of question label, type of question (text, radio, select).`;

export type GenerateResearchRequest = {
  totalQuestions: number;
  topic: string;
};

type GeneratedFormField = {
  label: string;
  type: "text" | "radio" | "select";
  options?: string[];
};

const generateResearch = async (request: GenerateResearchRequest) => {
  const prompt = generateOpenAiPrompt(request);

  const { data: generated } = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0,
    max_tokens: 500,
  });

  const generatedText = generated.choices[0].text;
  const generatedFormFields: GeneratedFormField[] = generatedText
    ? JSON.parse(generatedText)
    : [];

  return generatedFormFields;
};

export default generateResearch;

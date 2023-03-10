import { GenerateResearchRequest } from "@/pages/api/generate";
import { randomUUID } from "crypto";
import openai from "./openai";

const generateOpenAiPrompt = ({
  totalQuestions,
  topic,
}: GenerateResearchRequest) =>
  `Create a survey with ${totalQuestions} questions in the form of text input and dropdown (select) options. The topic of this research is "${topic}". Response is an array of questions where each question is in valid JSON format consisting of question label, type (text, select), options (if select)`;

export type GeneratedFormField = {
  id: string;
  label: string;
  type: "text" | "radio" | "select";
  options?: string[];
};

const generateResearch = async (
  request: GenerateResearchRequest
): Promise<GeneratedFormField[]> => {
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

  return generatedFormFields.map((field) => ({ ...field, id: randomUUID() }));
};

export default generateResearch;

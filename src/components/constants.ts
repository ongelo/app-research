import { BlockType } from "./enums";

const DEFAULT_CODE = `
const { name, age } = formValues;

let welcomeMessage = \`Hi there, \${name}!\`

if (age < 18) {
  welcomeMessage = \`\${welcomeMessage} You have to be 18+ to use this site.\`
} else {
  welcomeMessage = \`\${welcomeMessage} You are welcome to use this site.\`
}

return welcomeMessage;
`;

export const INITIAL_BLOCKS = [
  {
    id: "descriptionOfResearch",
    type: BlockType.PlainText,
    details: {
      text: "Enter here",
    },
  },
  {
    id: "name",
    type: BlockType.InputText,
    details: {
      label: "Name",
      placeholder: "Oguz Obama",
    },
  },
  {
    id: "age",
    type: BlockType.InputNumber,
    details: {
      label: "Age",
      placeholder: "",
    },
  },
  {
    id: "code1",
    type: BlockType.InputCode,
    details: {
      code: DEFAULT_CODE,
    },
  },
  {
    id: "gender",
    type: BlockType.InputSelect,
    details: {
      label: "Gender",
      options: ["Male", "Female"],
    },
  },
];

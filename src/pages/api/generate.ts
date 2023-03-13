import generateResearch from "@/backend/generateResearch";
import type { NextApiRequest, NextApiResponse } from "next";

export type GenerateResearchRequest = {
  totalQuestions: number;
  topic: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const request = req.body as GenerateResearchRequest;

    if (request.totalQuestions > 8) {
      res.status(400).json({
        message: "More than 8 questions for a survey is not recommended.",
      });
    }

    const fields = await generateResearch(req.body);
    return res.status(200).json(fields);
  }

  return res.status(200);
}

import generateResearch from "@/backend/generateResearch";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const fields = await generateResearch(req.body);
  res.status(200).json(fields);
}

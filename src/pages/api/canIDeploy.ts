// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
  date: string;
  validated: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  console.log(dayjs(req.query.date as string));
  const date = req.query.date ? dayjs(req.query.date as string) : dayjs();
  res.status(200).json({
    date: date.toISOString(),
    validated: date.day() !== 5,
  });
}

// The API route is now available at http://localhost:3000/api/canIDeploy?date=2021-09-10

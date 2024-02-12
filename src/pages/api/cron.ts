import type { NextApiRequest, NextApiResponse } from "next";

import { updatePricesJob } from "../../cron";
export const maxDuration = 300;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(222, req.headers);
    const vercelSc = JSON.parse((req.headers["x-vercel-sc-headers"] as string) || '{}') as Record<string, any>;
    console.log('vercelSc: ', JSON.stringify(vercelSc));
    console.log(1111, process.env.CRON_SECRET);
    //@ts-ignore
    const authHeader = req.headers.get('authorization');
    console.log('authHeader: ', authHeader);
    if (vercelSc["Authorization"] !== `Bearer ${process.env.CRON_SECRET}`) {
      console.log("Unauthorized");
      return res.status(401).end("Unauthorized");
    }
    console.log("do updatePricesJob");
    await updatePricesJob();
    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.log("err: ", err);
    res.status(500).json({ message: "server internal error!" });
  }
}

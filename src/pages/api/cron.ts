import type { NextApiRequest, NextApiResponse } from "next";

import { updatePricesJob } from "../../cron";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('req.headers["Authorization"]: ', req.headers["Authorization"]);
    // @ts-ignore
    console.log("123213", req.headers.get("Authorization"));
    if (
      // @ts-ignore
      req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      console.log("Unauthorized");
      return res.status(401).end("Unauthorized");
    }
    console.log("updatePricesJob");
    await updatePricesJob();
    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.log("err: ", err);
    res.status(500).json({ message: "server internal error!" });
  }
}

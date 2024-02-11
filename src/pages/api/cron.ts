import type { NextApiRequest, NextApiResponse } from "next";

import { updatePricesJob } from "../../cron"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await updatePricesJob()
    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.log("err: ", err);
    res.status(500).json({ message: "server internal error!" });
  }
}


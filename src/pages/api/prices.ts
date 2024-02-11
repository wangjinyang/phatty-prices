import type { NextApiRequest, NextApiResponse } from "next";
import PricesService from "../../services/prices";
import connectDB from "../../db";

const pricesService = new PricesService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  try {
    await connectDB();
    const { timestamp } = req.query;
    if (!timestamp) {
      res.status(400).json({ message: "timestamp is necessary!" });
      return;
    }
    const tempTimestamp = Number(timestamp as string);
    const time = {
      oneHourAgo: tempTimestamp - 3600,
      oneDayAgo: tempTimestamp - 24 * 3600,
      oneWeekAgo: tempTimestamp - 7 * 24 * 3600,
      oneMonthAgo: tempTimestamp - 30 * 24 * 3600,
      twoMonthAgo: tempTimestamp - 30 * 24 * 3600 * 2,
    };
    const result = {} as Record<string, any>;
    for (const [key, val] of Object.entries(time)) {
      const price = await pricesService.findPriceByTimestamp(val);
      result[key] = price?.prices;
    }
    return res.status(200).json(result);
  } catch (err) {
    console.log("err: ", err);
    res.status(500).json({ message: "server internal error!" });
  }
}

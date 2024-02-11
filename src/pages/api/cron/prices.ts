import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../db";
import { updatePricesJob } from "../../../request";

export default async function handler(req: NextRequest) {
  await connectDB();
  await updatePricesJob()
  return new NextResponse('run job', {
    status: 200,
  });
}

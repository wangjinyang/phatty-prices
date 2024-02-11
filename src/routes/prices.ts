import { Context } from "koa";
import Router from "koa-router";

import PricesService from "../services/prices";

const pricesService = new PricesService();
const pricesRouter = new Router({
  prefix: "/api/prices",
});

pricesRouter
  .get("/", async (ctx: Context) => {
    try {
      const { timestamp } = ctx.request.query
      const tempTimestamp = Number(timestamp as string)
      const time = {
        oneHourAgo: tempTimestamp - 3600,
        oneDayAgo: tempTimestamp - 24 * 3600,
        oneWeekAgo: tempTimestamp - 7 * 24 * 3600,
        oneMonthAgo: tempTimestamp - 30 * 24 * 3600,
        twoMonthAgo: tempTimestamp - 30 * 24 * 3600 * 2
      }
      const res = {} as Record<string, any>
      for(const [key, val] of Object.entries(time)){
        const price = await pricesService.findPriceByTimestamp(val)
        res[key] = price.prices
      }
      ctx.body = res;
      ctx.status = 200;
    } catch (error) {
      console.log("error: ", error);
      ctx.body = "validUser error";
      ctx.status = 400
    }
  })

export default pricesRouter;

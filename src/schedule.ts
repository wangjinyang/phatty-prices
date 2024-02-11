import schedule from "node-schedule";
import { updatePricesJob } from "./request";

const rule = new schedule.RecurrenceRule();
rule.minute = [0, 30];

updatePricesJob();
const job = schedule.scheduleJob(rule, () => {
  updatePricesJob();
});

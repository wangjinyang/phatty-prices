import Prices from "../db/models/prices";
import { IPrice } from "../db/schemas/prices";

export default class PricesService {
  public async addPrice(data: IPrice[]) {
    try {
      return await Prices.insertMany(data);
    } catch (error) {
      console.log("error: ", error);
      throw error;
    }
  }
  public async findPriceByTimestamp(timestamp: number) {
    return await Prices.findOne({ timestamp: { $lte: timestamp } }).sort({
      timestamp: -1,
    });
  }
  public async findPriceByNumber(number: number) {
    return await Prices.findOne({ number: number });
  }
  public async questLastPrice() {
    return await Prices.findOne().sort({ timestamp: -1 });
  }
  public async deletePrice(timestamps: number[]) {
    return await Prices.deleteMany({
      timestamp: { $nin: timestamps },
    });
  }
}

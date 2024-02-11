import { Document, Schema } from "mongoose";

type PricesItem = {
  id: string;
  [X: string]: string;
};

export type IPrice = {
  number: number;
  timestamp: number;
  prices: {
    pulsex: PricesItem[];
    pulsexV2: PricesItem[];
    phux: PricesItem[];
  };
};

export interface IPrices extends Document, IPrice {}

export const PricesSchema: Schema = new Schema({
  number: {
    type: Number,
    unique: true,
  },
  timestamp: {
    type: Number,
    required: true,
    unique: true,
  },
  prices: Object,
});

PricesSchema.index({ number: 1 }, { background: true });
PricesSchema.index({ timestamp: 1 }, { background: true });

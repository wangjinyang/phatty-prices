import { model } from 'mongoose';

import { PricesSchema, IPrices } from '../schemas/prices';

export default model<IPrices>('Prices', PricesSchema);

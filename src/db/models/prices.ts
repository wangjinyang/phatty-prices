import { model, models } from 'mongoose';

import { PricesSchema, IPrices } from '../schemas/prices';

const Prices = models.Prices || model<IPrices>('Prices', PricesSchema);

export default Prices;

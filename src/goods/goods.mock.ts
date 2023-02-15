import { GoodsEntity } from './goods.entity';

export const goodsStub = [
  {
    id: 1,
    name: 'Apple',
    description: 'Fresh Apple',
    price: 1.02,
    quantity: 12,
    warehouseId: 1,
  },
  {
    id: 2,
    name: 'Orange',
    description: 'Preserved Orange',
    price: 3.02,
    quantity: 120,
    warehouseId: 2,
  },
  {
    id: 3,
    name: 'Banana',
    description: 'Nothing special banana',
    price: 9999,
    quantity: 1,
    warehouseId: 2,
  },
] as GoodsEntity[];

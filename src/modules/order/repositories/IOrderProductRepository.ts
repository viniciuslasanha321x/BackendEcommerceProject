import ICreateOrderProductDTO from '../dtos/ICreateOrderProductDTO';
import OrderProduct from '../infra/typeorm/entities/OrderProduct';

export default interface IOrderProductRepository {
  create(data: ICreateOrderProductDTO): Promise<OrderProduct>;
  save(orderProduct: OrderProduct): Promise<OrderProduct>;
  findById(id: string): Promise<OrderProduct | undefined>;
  remove(orderProduct: OrderProduct): Promise<void>;
}

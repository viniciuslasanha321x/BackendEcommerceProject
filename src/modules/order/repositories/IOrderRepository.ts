import Order from '../infra/typeorm/entities/Order';
import ICreateOrderDTO from '../dtos/ICreateOrderDTO';

export default interface IOrderRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
  save(order: Order): Promise<Order>;
  findByUserId(user_id: string): Promise<Order | undefined>;
}

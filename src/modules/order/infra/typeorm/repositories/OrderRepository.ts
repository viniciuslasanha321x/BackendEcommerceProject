import ICreateOrderDTO from '@modules/order/dtos/ICreateOrderDTO';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import { getRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  findByUserId(user_id: string): Promise<Order | undefined> {
    return this.ormRepository.findOne({
      relations: ['items', 'items.variant', 'items.variant.product'],
      where: { user_id, status: null },
    });
  }

  async create(dataOrder: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create(dataOrder);

    return this.ormRepository.save(order);
  }

  async save(order: Order): Promise<Order> {
    return this.ormRepository.save(order);
  }
}

export default OrderRepository;

import ICreateOrderProductDTO from '@modules/order/dtos/ICreateOrderProductDTO';
import IOrderProductRepository from '@modules/order/repositories/IOrderProductRepository';
import { getRepository, Repository } from 'typeorm';
import OrderProduct from '../entities/OrderProduct';

class OrderProductRepository implements IOrderProductRepository {
  private ormRepository: Repository<OrderProduct>;

  constructor() {
    this.ormRepository = getRepository(OrderProduct);
  }

  async create(
    dataOrderProduct: ICreateOrderProductDTO
  ): Promise<OrderProduct> {
    const orderProduct = this.ormRepository.create(dataOrderProduct);

    return this.ormRepository.save(orderProduct);
  }

  async save(orderProduct: OrderProduct): Promise<OrderProduct> {
    return this.ormRepository.save(orderProduct);
  }

  async findById(id: string): Promise<OrderProduct | undefined> {
    return this.ormRepository.findOne({ id });
  }

  async remove(orderProduct: OrderProduct): Promise<void> {
    await this.ormRepository.remove(orderProduct);
  }

  async findAll(): Promise<OrderProduct[]> {
    return this.ormRepository.find({
      relations: ['product', 'product.images'],
    });
  }
}

export default OrderProductRepository;

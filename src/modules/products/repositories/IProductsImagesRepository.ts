import ICreateProductImageDTO from '../dtos/ICreateProductImageDTO';
import Image from '../infra/typeorm/entities/Images';

export default interface IProductImageRepository {
  create(date: ICreateProductImageDTO): Promise<Image>;
  remove(file: Image): Promise<void>;
}

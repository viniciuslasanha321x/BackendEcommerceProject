import Product from '../infra/typeorm/entities/Product';

export default interface ICreateProductImageDTO {
  product: Product;
  filename: string;
}

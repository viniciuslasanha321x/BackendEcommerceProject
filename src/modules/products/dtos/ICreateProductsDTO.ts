import Category from '../infra/typeorm/entities/Category';

export default interface ICreateProductDTO {
  title: string;
  price: number;
  description: string;
  color: string;
  stock: string;
  categories: Category[];
}

import Category from '@modules/categories/infra/typeorm/entities/Category';

export default interface ICreateProductDTO {
  title: string;
  price: number;
  description: string;
  color: string;
  stock: number;
  categories: Category[];
  status: boolean;
}

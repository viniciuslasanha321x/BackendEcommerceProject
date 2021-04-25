import Category from '@modules/categories/infra/typeorm/entities/Category';

export default interface ICreateProductDTO {
  title: string;
  price: number;
  description: string;
  categories: Category[];
  status: boolean;
}

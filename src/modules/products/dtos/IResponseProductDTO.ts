import Product from '../infra/typeorm/entities/Product';

export default interface IResponseProductDTO {
  products: Product[];
  pages: {
    page: number;
    of: number;
  };
}

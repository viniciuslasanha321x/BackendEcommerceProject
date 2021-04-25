import ProductVariant from '@modules/products/infra/typeorm/entities/ProductVariant';

export default interface ICreateOrderProductDTO {
  order_id: string;
  variant: ProductVariant;
  price: number;
  qtd: number;
}

export default interface IFindAllProductsDTO {
  search?: string;
  category_id?: string;
  page?: number;
  limit?: number;
  admin?: boolean;
}

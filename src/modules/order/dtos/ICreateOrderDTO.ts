import OrderProduct from '../infra/typeorm/entities/OrderProduct';

export default interface ICreateOrderDTO {
  user_id: string;
  total?: number;
  items?: OrderProduct[];
  status?: string;
}

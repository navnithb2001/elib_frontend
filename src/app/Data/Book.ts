import { Order } from './Order';
export interface Book{
  isbn: string;
  title: string;
  cover:string;
  publisher:string;
  pages: number;
  available: number;
  orders: Order[];
  rating: number;
}

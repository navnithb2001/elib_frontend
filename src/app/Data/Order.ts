import { Book } from './Book';
import { User } from "./User";

export interface Order{
  booking_id: string;
  booking_date: Date;
  return_date: Date;
  isOverdue: boolean;
  book: Book;
  user: User;
}

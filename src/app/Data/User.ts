import { Order } from "./Order";
import { Roles } from "./Roles";

export interface User{
  userId: number;
  username: string;
  password: string;
  name: string;
  fine: number;
  dob: Date;
  address: string;
  order: Order[];
  role: Roles;

}

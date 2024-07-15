import { GetTransactions } from "./get-transactions";

export interface GetCustomers {
  id: string;
  name: string;
  transactions?: GetTransactions[];
}

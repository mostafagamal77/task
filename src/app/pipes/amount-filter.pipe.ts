import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountFilter'
})
export class AmountFilterPipe implements PipeTransform {

  transform(customers: any[], amount: number | null): any[] {
    if (!customers) return [];
    if (!amount) return customers;
    return customers.map(item => {
      const filteredTransactions = item.transactions.filter((transaction: any) => transaction.amount >= amount);
      return { ...item, transactions: filteredTransactions };
    }).filter(item => item.transactions.length > 0);
  }

}

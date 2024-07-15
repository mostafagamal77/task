import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(customers: any[], date: string | null): any[] {
    if (!customers) return [];
    if (!date) return customers;

    return customers.map(item => {
      const filteredTransactions = item.transactions.filter((transaction: any) => transaction.date === date);
      return { ...item, transactions: filteredTransactions };
    }).filter(item => item.transactions.length > 0);
  }

}

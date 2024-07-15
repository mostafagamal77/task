import { Pipe, PipeTransform } from '@angular/core';
import { GetCustomers } from '../modals/get-customers';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(customers: GetCustomers[], searchText: string): GetCustomers[] {
    if (!customers) return [];
    if (!searchText) return customers;
    return customers.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
  }

}

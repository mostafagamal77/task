import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { GetCustomers } from 'src/app/modals/get-customers';
import { GetTransactions } from 'src/app/modals/get-transactions';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent implements OnInit, OnDestroy {

  private readonly customersService = inject(CustomersService);

  destroy$ = new Subject<void>();
  customers!: GetCustomers[];
  combinedData: any[] = [];
  transactions!: GetTransactions[];
  searchTerm: string = '';
  loading: boolean = false;
  page: number = 1;
  pageSize: number = 5;
  total: number = 0;
  nameSearchText = '';
  minAmount: number | null = null;
  maxAmount: number | null = null;
  searchAmount: number | null = null;


  ngOnInit(): void {
    this.getAllData();
  }


  getAllData() {
    this.customersService.getAllCustomers().pipe(
      switchMap(customers => {
        this.customers = customers;
        return this.customersService.getAllTransactions();
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: transactions => {
        this.transactions = transactions;
        this.combineData();
      },
      error: err => {
        console.error('Error fetching data:', err);
      }
    });
  }

  combineData() {
    const customerTransactions: any = {};

    // Group transactions by customer_id
    this.transactions.forEach(transaction => {
      const customerId = transaction.customer_id;
      if (!customerTransactions[customerId]) {
        customerTransactions[customerId] = {
          id: customerId,
          transactions: []
        };
      }
      customerTransactions[customerId].transactions.push(transaction);
    });

    // Combine customers with their transactions
    this.customers.forEach(customer => {
      const customerId = parseInt(customer.id, 10);
      const customerData = {
        id: customerId,
        name: customer.name,
        transactions: customerTransactions[customerId] ? customerTransactions[customerId].transactions : []
      };
      this.combinedData.push(customerData);
    });

    console.log(this.combinedData);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

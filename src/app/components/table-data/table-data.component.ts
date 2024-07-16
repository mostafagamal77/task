import { Component, ElementRef, EventEmitter, inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
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

  @ViewChild('chartContainer') chartContainer!: ElementRef;


  destroy$ = new Subject<void>();
  customers!: GetCustomers[];
  combinedData: any[] = [];
  transactions!: GetTransactions[];
  page: number = 1;
  pageSize: number = 5;
  total: number = 0;
  nameSearchText: string = '';
  searchAmount: number | null = null;
  searchDate!: string;
  selectedCustomer!: GetCustomers;

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
  }

  selectCustomer(customer: GetCustomers) {
    this.selectedCustomer = customer
    this.scrollToChart();
  }

  resetFilters() {
    this.nameSearchText = '';
    this.searchAmount = null;
    this.searchDate = '';
  }

  scrollToChart() {
    if (this.chartContainer) {
      this.chartContainer.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

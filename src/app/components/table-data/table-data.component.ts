import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { GetCustomers } from 'src/app/modals/get-customers';
import { GetTransactions } from 'src/app/modals/get-transactions';
import { CustomersService } from 'src/app/services/customers.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

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
  selectedCustomerId: number | null = null;



  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Total Amount",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          },
          columnWidth: '10%', // Adjust the width of the bars
          distributed: true
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => val + '',
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304008"]
        }
      },
      xaxis: {
        categories: [],
        position: "bottom",
        labels: {
          offsetY: 0
        },
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true
        },
        labels: {
          show: true,
          formatter: (val) => val + '',
        }
      },
      title: {
        text: `Total Amount of Transactions per Day`,
        offsetY: 0,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }

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

  onCustomerChange(event: any) {
    const customerId = parseInt(event.target.value, 10);
    this.selectedCustomerId = customerId;
  }

  selectCustomer(customer: GetCustomers) {
    this.updateChart(customer);
  }

  updateChart(customer: GetCustomers) {
    if (customer) {
      const transactions = customer.transactions;
      const transactionsPerDay = transactions?.reduce((acc: any, transaction: any) => {
        const date = transaction.date;
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += transaction.amount;
        return acc;
      }, {});

      const dates = Object.keys(transactionsPerDay);
      const amounts = Object.values(transactionsPerDay).map(value => value as number);

      this.chartOptions = {
        series: [
          {
            name: "Total Amount",
            data: amounts
          }
        ],
        chart: {
          height: 350,
          type: "bar"
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top" // top, center, bottom
            },
            columnWidth: '10%', // Adjust the width of the bars
            distributed: true
          }
        },
        dataLabels: {
          enabled: true,
          formatter: (val) => val + '',
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304008"]
          }
        },
        xaxis: {
          categories: dates,
          position: "bottom",
          labels: {
            offsetY: 0
          },
          axisBorder: {
            show: true
          },
          axisTicks: {
            show: true
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5
              }
            }
          },
          tooltip: {
            enabled: true,
            offsetY: -35
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
          }
        },
        yaxis: {
          axisBorder: {
            show: true
          },
          axisTicks: {
            show: true
          },
          labels: {
            show: true,
            formatter: (val) => val + '',
          }
        },
        title: {
          text: `Total Amount of Transactions per Day for ${customer.name}`,
          offsetY: 0,
          align: "center",
          style: {
            color: "#444"
          }
        }
      };
    }
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

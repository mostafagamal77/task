import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
  ChartComponent
} from "ng-apexcharts";
import { GetCustomers } from 'src/app/modals/get-customers';

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
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class CustomChartComponent {

  @Input() customer!: any;

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
        text: `Please select customer to show graph`,
        offsetY: 0,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customer'] && changes['customer'].currentValue) {
      this.updateChart(this.customer)
    }
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
          align: "left",
          style: {
            color: "#444"
          }
        }
      };
    }
  }

}

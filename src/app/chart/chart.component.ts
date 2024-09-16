import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(private task: TaskService) { }

  graphdata: any;
  valuedata: any[] = [];
  lineChartdata: any;
  lineMonth: any[] = [];
  lineValue: any[] = [];
  barChartdata: any;
  barMonth: any[] = [];
  barValue: any[] = [];

  /**
   * Angular lifecycle hook `ngOnInit` which is called when the component is initialized.
   * - Registers Chart.js components.
   * - Fetches data from the API using the TaskService and stores it for use in the chart creation.
   * - Calls chart creation methods after ensuring data is fetched asynchronously.
   */
  ngOnInit(): void {
    // Register all required components from Chart.js
    Chart.register(...registerables);
    
    // Fetch and prepare the data for each chart
    this.lineChart();
    this.barChart();
    this.graph();

    // Create charts after a small delay to allow time for data fetching
    setTimeout(() => {
      this.createLineChart(this.lineMonth, this.lineValue);
      this.createBarChart(this.barMonth, this.barValue);
      this.createPieChart();
      this.createPieChart2();
      this.createPieChart3(this.valuedata);
    }, 100);
  }

  /**
   * Fetches data for the line chart from the TaskService API.
   * - Populates `lineMonth` and `lineValue` arrays with the retrieved data.
   */
  lineChart() {
    this.task.linechart().subscribe(res => {
      console.log(res);
      this.lineChartdata = res;
      if (this.lineChartdata != null) {
        for (let i = 0; i < this.lineChartdata.length; i++) {
          this.lineMonth.push(this.lineChartdata[i].month);
          this.lineValue.push(this.lineChartdata[i].Total);
        }
      }
    });
  }

  /**
   * Creates and renders the line chart using Chart.js.
   *  lineMonth - An array of months to display on the X-axis.
   *  lineValue - An array of values corresponding to each month.
   */
  createLineChart(lineMonth: any, lineValue: any) {
    const ctxLine = document.getElementById('lineGraph') as HTMLCanvasElement;
    new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: lineMonth,
        datasets: [{
          label: 'New Stations',
          data: lineValue,
          borderColor: 'rgba(0, 74, 255, 0.55)',
          borderWidth: 4,
          fill: true
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            grid: { display: false },
            border: { display: false }
          },
          y: {
            beginAtZero: false,
            border: { display: false }
          }
        }
      }
    });
  }

  /**
   * Fetches data for the bar chart from the TaskService API.
   * - Populates `barMonth` and `barValue` arrays with the retrieved data.
   */
  barChart() {
    this.task.barchart().subscribe(res => {
      this.barChartdata = res;
      if (this.barChartdata != null) {
        for (let i = 0; i < this.barChartdata.length; i++) {
          this.barMonth.push(this.barChartdata[i].month);
          this.barValue.push(this.barChartdata[i].Total);
        }
      }
    });
  }

  /**
   * Creates and renders the bar chart using Chart.js.
   *  barMonth - An array of months to display on the X-axis.
   *  barValue - An array of values corresponding to each month.
   */
  createBarChart(barMonth: any, barValue: any) {
    const ctxBar = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: barMonth,
        datasets: [{
          label: 'New Customers',
          data: barValue,
          barThickness: 25,
          minBarLength: 4,
          backgroundColor: 'rgba(0, 74, 253, 0.79)', 
          borderColor: 'rgb(135, 206, 235)', 
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: false,
            grid: { display: false }
          },
          y: {
            border: { display: false }
          }
        }
      }
    });
  }

  /**
   * Creates and renders the first pie chart using hardcoded data.
   */
  createPieChart() {
    const ctxPie = document.getElementById('pieChart') as HTMLCanvasElement;
    new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [{
          label: 'Dataset 1',
          data: [10, 25, 50, 90, 60],
          backgroundColor: [
            'rgba(11, 74, 137, 0.75)',
            'rgba(11, 152, 255, 0.75)',
            'rgba(0, 0, 191, 0.61)',
            'rgba(204, 152, 52, 1)',
            'rgba(11, 74, 0, 0.75)'
          ],
          borderColor: [
            'rgba(11, 74, 137, 0.75)',
            'rgba(11, 152, 255, 0.75)',
            'rgba(0, 0, 191, 0.61)',
            'rgba(204, 152, 52, 1)',
            'rgba(11, 74, 0, 0.75)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const label = tooltipItem.label || '';
                const value = tooltipItem.raw || 0;
                return `${label}: ${value}`;
              }
            }
          }
        }
      }
    });
  }

  /**
   * Creates and renders the second pie chart using hardcoded data.
   */
  createPieChart2() {
    const ctxPie = document.getElementById('pieChart2') as HTMLCanvasElement;
    new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: ["January", "February", "March", "April", "May", 
                 "June", "July", "August", "September"],
        datasets: [{
          label: 'Dataset 1',
          data: [25, 75],
          backgroundColor: [
            'rgba(186, 113, 67, 1)',
            'rgba(240, 0, 191, 0.61)'
          ],
          borderColor: [
            'rgba(186, 113, 67, 1)',
            'rgba(240, 0, 191, 0.61)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const label = tooltipItem.label || '';
                const value = tooltipItem.raw || 0;
                return `${label}: ${value}`;
              }
            }
          }
        }
      }
    });
  }

  /**
   * Fetches data for dynamic charts (e.g., pie chart) from the TaskService API.
   * - Populates the `valuedata` array with values fetched from the API.
   */
  graph() {
    this.task.graph().subscribe(res => {
      console.log(res);
      this.graphdata = res;
      if (this.graphdata != null) {
        for (let i = 0; i < this.graphdata.length; i++) {
          this.valuedata.push(this.graphdata[i].value);
        }
      }
    });
  }

  /**
   * Creates and renders a dynamic pie chart based on data fetched from the API.
   *  valuedata - An array of values used in the chart.
   */
  createPieChart3(valuedata: any) {
    const ctxPie = document.getElementById('pieChart3') as HTMLCanvasElement;
    new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: ['active chargers', 'inactive chargers', 'maintenance chargers'],
        datasets: [{
          label: 'Dataset 1',
          data: valuedata,
          backgroundColor: [
            'rgba(255, 0, 0, 0.79)',          
            'rgba(0, 74, 0, 0.79)',
            'rgba(0, 74, 112, 0.79)'
          ],
          borderColor: [
            'rgba(255, 0, 0, 0.79)',          
            'rgba(0, 74, 0, 0.79)',
            'rgba(0, 74, 112, 0.79)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const label = tooltipItem.label || '';
                const value = tooltipItem.raw || 0;
                return `${label}: ${value}`;
              }
            }
          }
        }
      }
    });
  }
}

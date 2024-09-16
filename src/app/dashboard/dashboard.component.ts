import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private task: TaskService) { }
  cardItems: any[] = [];

  /**
   * Angular lifecycle hook `ngOnInit` that runs once when the component is initialized.
   * - Calls the `cardData()` method to fetch and display dashboard card data from the API.
   */
  ngOnInit(): void {
    this.cardData();
  }

  /**
   * Fetches card data from the TaskService API.
   * - The method subscribes to the `dashboard()` method from the service.
   * - Populates the `cardItems` array with the response data for use in the template.
   */
  cardData() {
    this.task.dashboard().subscribe(res => {
      console.log(res);
      this.cardItems = res;
    });
  }
}

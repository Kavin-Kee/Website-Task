import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../task.service';
import { MatTableDataSource } from '@angular/material/table';
import { Owner } from '../Owner';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  /**
   * The list of owners retrieved from the API response.
   */
  ownerList!: Owner[];

  /**
   * Data source used for populating the Material table with owner data.
   */
  dataSource: any;

  /**
   * Defines the columns to be displayed in the Material table.
   */
  displayedColumns: string[] = [
    "SNo",
    "OwnerName",
    "Email",
    "PhoneNumber",
    "Address",
    "Location",
    "Account",
    "Bank",
    "Branch",
    "IFSC",
    "OwnerStatus"
  ];

  /**
   * Reference to the Material paginator used for paginating the table data.
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Controls the visibility of the filter toggle.
   */
  openFilter = false;

  constructor(private task: TaskService) { }

  /**
   * Angular lifecycle hook `ngOnInit` that is triggered after the component has been initialized.
   * 
   * - This method calls the `report()` method from the `TaskService` to retrieve the list of owners.
   * - The data is then assigned to `ownerList` and set up as the data source for the Material table.
   * - Pagination is added to the data source via the `paginator` property.
   */
  ngOnInit(): void {
    this.task.report().subscribe(res => {
      console.log(res);
      this.ownerList = res;
      this.dataSource = new MatTableDataSource<Owner>(this.ownerList);
      this.dataSource.paginator = this.paginator;
    });
  }

  /**
   * This method filters the table data based on the user's input.
   * It captures the value entered into the input field and applies it as a filter to the data source.
   * 
   *  data - The event triggered when the user types into the filter input field.
   */
  FilterChange(data: Event) {
    const val = (data.target as HTMLInputElement).value;
    this.dataSource.filter = val.trim().toLowerCase();
  }

  /**
   * Toggles the visibility of the filter input field.
   * This method updates the `openFilter` property, which determines whether the filter input field is visible.
   */
  toggleFilter() {
    this.openFilter = !this.openFilter;
  }
}

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterOutlet } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface TicketData {
  id: number;
  title: string;
  desc: string;
  status: string;
}

/** Constants used to fill up our data base. */

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tickets';
  STATUSES: string[] = ["To Do", "In Progress", "Done"];
  displayedColumns: string[] = ['id', 'title', 'desc', 'status'];
  dataSource: MatTableDataSource<TicketData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ticketAddForm: FormGroup;
    

  constructor() {
    this.ticketAddForm = new FormGroup({
      title: new FormControl('', [Validators.required,Validators.minLength(4)]),
      desc: new FormControl(''),
      status: new FormControl('To Do',[Validators.required])
    });
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([{id:1, title:"test", desc:"desc", status:"In Progress"}]);
  }

  ngAfterViewInit() {
    this.dataSource.filterPredicate = (data: TicketData, filter: string) => data.status == filter;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue:string) {
    console.log(filterValue);
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmit(){
    console.log(this.ticketAddForm);
  }
}

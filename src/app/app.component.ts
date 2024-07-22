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
import { AppService } from './app.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

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
  imports: [RouterOutlet, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tickets';
  STATUSES: string[] = ["To Do", "In Progress", "Done"];
  displayedColumns: string[] = ['id', 'title', 'description', 'status', 'delete'];
  dataSource: MatTableDataSource<TicketData> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ticketAddForm: FormGroup;
    

  constructor(private service: AppService) {
    this.ticketAddForm = new FormGroup({
      title: new FormControl('', [Validators.required,Validators.minLength(4)]),
      description: new FormControl(''),
      status: new FormControl('To Do',[Validators.required])
    });
    this.getTickets();
  }

  getTickets(){
    this.service.getTickets().subscribe((res:any)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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
    this.service.addTicket(this.ticketAddForm.value).subscribe(res=>{
      this.getTickets();
      this.ticketAddForm.reset();
    });
  }

  onDelete(id:number){
    if(confirm('Are you sure?')){
      this.service.deleteTicket(id).subscribe(res=>{
        this.getTickets();
      });
    }
  }
}

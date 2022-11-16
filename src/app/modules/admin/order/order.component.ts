import { Component, OnInit,ViewChild } from '@angular/core';
import { AdminapiService } from 'src/app/api/adminapi.service';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  displayedColumns: string[] = [ 'OrderPrefix','User','PaymentType','TotalAmount','OrderStatus','PaymentStatus' ,'Actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api:AdminapiService,public dialog: MatDialog,private toastr: ToastrService) { }

  categoryitem:any = {};

  dtOptions: DataTables.Settings = {};



  ngOnInit(): void {
    this.getOrders();

 
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: false,
      lengthMenu: [5, 10, 25, 50, 100],

      
   
      
    }
  }
    getOrders(){
      this.api.getOrders().subscribe(res=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }








  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
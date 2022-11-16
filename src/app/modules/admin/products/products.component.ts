import { Component, OnInit,ViewChild } from '@angular/core';
import { AdminapiService } from 'src/app/api/adminapi.service';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ProductFormComponent } from './product-form/product-form.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    
  displayedColumns: string[] = [ 'ProductImage','ProductName','ProductPrice','SellingPrice','Status','Actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api:AdminapiService,public dialog: MatDialog,private toastr: ToastrService) { }

  categoryitem:any = {};

  dtOptions: DataTables.Settings = {};

  openProductDialog(){
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '100%',
      height:'80%',
      disableClose:true,
      
    })
  }

  openUpdateProductDialog(id:any){
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '820px',
      disableClose:true,
      data:id,

    })
  }
  

  ngOnInit(): void {

    this.api.getrefreshNeeded().subscribe(()=>{
      this.productList();
    })
    this.productList();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: false,
      lengthMenu: [5, 10, 25, 50, 100],

      
   
      
    }

  }





  productList(){
    this.api.getProducts().subscribe((data:any)=>{
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    
     
    })
  }

  removeProduct(id:any){
    
    this.api.deleteProduct(id).subscribe((data:any)=>{
      this.toastr.success('Banner Deleted Successfully');
   
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
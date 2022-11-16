import { Component, OnInit,ViewChild } from '@angular/core';
import { AdminapiService } from 'src/app/api/adminapi.service';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CategoryFormComponent } from './category-form/category-form.component';
declare var $: any;



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit  {

  displayedColumns: string[] = [ 'CategoryImage','Name','Status','Actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api:AdminapiService,public dialog: MatDialog,private toastr: ToastrService) { }
  title = 'Category';
  categoryitem:any = {};

  dtOptions: DataTables.Settings = {};

  openCategoryDialog(){
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '500px',
      disableClose:true,
    })
  }

  openUpdateCategoryDialog(id:any){
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '500px',
      disableClose:true,
      data:id,
    })
  }
  

  ngOnInit(): void {
    this.api.getrefreshNeeded().subscribe(()=>{
      this.categoryList();
    })
    this.categoryList();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: false,
      lengthMenu: [5, 10, 25, 50, 100],

      
   
      
    }

  }





  categoryList(){
    this.api.getCategories().subscribe((data:any)=>{
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    
     
    })
  }

  removeCategory(id:any){
    let data={"id":id}
    this.api.deleteCategory(data).subscribe((data:any)=>{
      this.toastr.success('Category Deleted Successfully');
      this.categoryList();
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

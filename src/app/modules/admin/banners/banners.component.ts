import { Component, OnInit,ViewChild } from '@angular/core';
import { AdminapiService } from 'src/app/api/adminapi.service';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { BannerFormComponent } from './banner-form/banner-form.component';
@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {

  
  displayedColumns: string[] = [ 'BannerName','BannerImage','Status','Actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api:AdminapiService,public dialog: MatDialog,private toastr: ToastrService) { }

  categoryitem:any = {};

  dtOptions: DataTables.Settings = {};

  openBannerDialog(){
    const dialogRef = this.dialog.open(BannerFormComponent, {
      width: '500px',
      disableClose:true,
    })
  }

  openUpdateBannerDialog(id:any){
    const dialogRef = this.dialog.open(BannerFormComponent, {
      width: '500px',
      disableClose:true,
      data:id,
    })
  }
  

  ngOnInit(): void {
    this.api.getrefreshNeeded().subscribe(()=>{
      this.bannerList();
    })
    this.bannerList();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: false,
      lengthMenu: [5, 10, 25, 50, 100],

      
   
      
    }

  }





  bannerList(){
    this.api.getBanners().subscribe((data:any)=>{
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    
     
    })
  }

  removeBanner(id:any){
    let data={"id":id}
    this.api.deleteBanner(data).subscribe((data:any)=>{
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
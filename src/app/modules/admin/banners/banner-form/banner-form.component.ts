import { Component, Input, OnInit, Inject } from '@angular/core';
import { AdminapiService } from 'src/app/api/adminapi.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-banner-form',
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.css'],
})
export class BannerFormComponent implements OnInit {
  @Input() banner: any = {};
  selectedFile: any;
  label = 'Upload';
  constructor(
    private api: AdminapiService,
    private toastr: ToastrService,
    public router: Router,
    public dialogRef: MatDialogRef<BannerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any
  ) {}
  loader: boolean = false;
  img_url = 'http://localhost:4200/assets/no-image-available.png';
  ngOnInit(): void {

    if (this.id) {
      let data = {
        "id": this.id
      }
      this.api.getBannerById(data).subscribe((data: any) => {
        this.banner = data.data;
        this.img_url = data.data.img_url;
      });
    }



    this.getFile(this.selectedFile);
   
  }

  getFile(event: any) {
    if (event) {
      this.selectedFile = event.target.files[0];
      this.label = this.selectedFile.name;
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (event: any) => {
        this.img_url = event.target.result;
      };
    }
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  SaveData() {
    if (this.id) {

      let formData = new FormData();
      formData.append('id', this.id);
      formData.append('name', this.banner.name);
      formData.append('img_url', this.selectedFile, this.selectedFile.name);
      this.loader = true;
    
    
      
      this.api.updateBanner(formData).subscribe((data: any) => {
        this.loader = false;
        this.toastr.success(data.message);
        this.dialogRef.close();
      });
    }else
    {
      let formData = new FormData();
      formData.append('img_url', this.selectedFile, this.selectedFile.name);
      formData.append('name', this.banner.name);
      this.api.createBanner(formData).subscribe((data: any) => {
        this.loader = false;
        this.toastr.success(data.message);
        this.dialogRef.close();
      });
    }
  }
}

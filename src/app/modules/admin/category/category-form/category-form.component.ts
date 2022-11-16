import { Component, Input, OnInit,Inject } from '@angular/core';
import { AdminapiService } from 'src/app/api/adminapi.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  @Input() category:any = {};
  label="Create";
  constructor(private api:AdminapiService,private toastr: ToastrService,public router: Router,public dialogRef: MatDialogRef<CategoryFormComponent>,@Inject(MAT_DIALOG_DATA) public id: any) { }

  selectedFile: any;
  loader: boolean = false;
  img_url = 'http://localhost:4200/assets/no-image-available.png';
  ngOnInit(): void {
      if(this.id){
        this.label = "Update";
        let data = {
          "id":this.id
        }
        this.api.categoryGetById(data).subscribe((data:any)=>{

          this.category = data.data;
          this.img_url = data.data.image_url;
          console.log(this.category);
        })
      }
this.getCategory();
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



  SaveData(){
    
    if(this.id){

      let formData = new FormData();
      formData.append('id',this.id);
      formData.append('name',this.category.name);
      formData.append('img_url',this.selectedFile);
      this.loader = true;
      this.api.updateCategory(formData).subscribe((data:any)=>{
        this.loader = false;
        this.toastr.success(data.message);
        this.dialogRef.close();
      
        
      })
    }else{
      this.loader = true;
      let formData = new FormData();
      formData.append('name',this.category.name);
      formData.append('img_url',this.selectedFile);



      this.api.createCategory(formData).subscribe((data:any)=>{
        this.loader = false;
        this.toastr.success(data.message);
        this.dialogRef.close();
        this.getCategory();
       
      })
    }

 
  }

  getCategory(){
    this.api.getCategories().subscribe((data:any)=>{
      this.category = data.data;
    })
  }

  

}

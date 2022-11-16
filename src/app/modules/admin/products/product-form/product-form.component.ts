import { Component, Input, OnInit, Inject } from '@angular/core';
import { AdminapiService } from 'src/app/api/adminapi.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() product: any = {};
  category: any = {};
  vendor: any = {};
  selectedFile: any;
  label = 'Upload';
  constructor(
    private api: AdminapiService,
    private toastr: ToastrService,
    public router: Router,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any
  ) {}
  loader: boolean = false;
  img_url = 'http://localhost:4200/assets/no-image-available.png';





  ngOnInit(): void {
    
    this.getCategory();
    this.getVendors();

if (this.id) {
  this.api.getProductById(this.id).subscribe((data: any) => {
    this.product = data.data;
    this.img_url = this.product.image_url;
  })
}
    this.getFile(this.selectedFile);


    

 
  }


  getCategory() {
    this.api.getCategories().subscribe((data: any) => {
      this.category = data.data;
      console.log(this.category);
    });
  }
  getVendors() {
    this.api.getVendors().subscribe((data: any) => {
      this.vendor = data.data;
      console.log(this.vendor);
    });
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
  }

  SaveData() {

if (this.id) {
  let formData = new FormData();
  formData.append('id', this.id);
  formData.append('name', this.product.name);
  formData.append('product_mrp', this.product.product_mrp);
  formData.append('selling_price', this.product.selling_price);
  formData.append('description', this.product.description);
  formData.append('image_url', this.selectedFile, this.selectedFile.name);
  formData.append('category_id', this.product.category_id);
  formData.append('vendor_id', this.product.vendor_id);
  formData.append('purchase_price', this.product.purchase_price)

  formData.append('quantity', this.product.quantity);
  formData.append('unit', this.product.unit);
  this.api.updateProduct(formData).subscribe((data: any) => {
    this.toastr.success(data.message);
    this.dialogRef.close();
  })


   
}else
{
  let formData = new FormData();
  formData.append('name', this.product.name);
  formData.append('product_mrp', this.product.product_mrp);
  formData.append('selling_price', this.product.selling_price);
  formData.append('description', this.product.description);
  formData.append('image_url', this.selectedFile, this.selectedFile.name);
  formData.append('category_id', this.product.category_id);
  formData.append('vendor_id', this.product.vendor_id);
  formData.append('purchase_price', this.product.purchase_price)

  formData.append('quantity', this.product.quantity);
  formData.append('unit', this.product.unit);
  this.api.createProduct(formData).subscribe((data: any) => {
    this.toastr.success(data.message);
    this.dialogRef.close();
  })
}
    
  }

}

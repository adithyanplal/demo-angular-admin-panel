import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { BannersComponent } from './banners/banners.component';
import { CategoryComponent } from './category/category.component';
import { OrderComponent } from './order/order.component';
import { Routes,RouterModule } from '@angular/router';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { BannerFormComponent } from './banners/banner-form/banner-form.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import { MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table'; 
import {MatSortModule} from '@angular/material/sort'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {MatIconModule} from '@angular/material/icon'; 
import { FormsModule } from '@angular/forms';
import {AutoCompleteModule} from 'angular-ngx-autocomplete';
import {MatSelectModule} from '@angular/material/select'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import { NgChartsModule } from 'ng2-charts';
import { ChartModule } from 'angular2-chartjs';
/*Routes */

const adminRoutes: Routes = [
  {
    path: '',
    component:DashboardComponent,
    
  },
  {
    path: 'products',
    component:ProductsComponent
  },
  {
    path: 'banners',
    component:BannersComponent
  },
  {
    path: 'category',
    component:CategoryComponent
  },

  {
    path: 'order',
    component:OrderComponent
  }
]
@NgModule({
  declarations: [
    DashboardComponent,
    ProductsComponent,
    BannersComponent,
    CategoryComponent,
    OrderComponent,
    ProductFormComponent,
    CategoryFormComponent,
    BannerFormComponent,


  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    HttpClientModule,
    DataTablesModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    AutoCompleteModule,
    MatSelectModule,
    MatAutocompleteModule,
    NgChartsModule,
    SweetAlert2Module.forRoot(),
    ChartModule,
    
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 1500,
    }),
    

  ]
})
export class AdminModule { }

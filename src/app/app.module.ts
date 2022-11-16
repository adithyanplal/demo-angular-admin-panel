import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DataTablesModule } from 'angular-datatables';
import { AutoCompleteModule } from 'angular-ngx-autocomplete';









@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    EmptyLayoutComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
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
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 1500,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

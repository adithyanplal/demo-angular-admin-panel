import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardGuard } from './auth/admin-guard.guard';
import { LoginComponent } from './auth/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const routes: Routes = [

  // {
  //   path: '',
  //   component: LoginComponent,
  //   pathMatch: 'full'
  // },

  {
    path: '',
    component: MainLayoutComponent,


    // canActivate: [AdminGuardGuard],
    children: [
      {
        path: '',
        loadChildren:()=>import('./modules/admin/admin.module').then(m=>m.AdminModule)
      },
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

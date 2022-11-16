import { Component, Input, OnInit } from '@angular/core';
import { AdminapiService } from 'src/app/api/adminapi.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private api:AdminapiService,private toastr: ToastrService) { }

  @Input() LoginAuth: any = {};
  loader: boolean = false;


  ngOnInit(): void {

    if(localStorage.getItem('adminToken')){

      window.location.href = '/dashboard';
    }
 

  }


  adminLogin(){

    this.loader = true;

    this.api.adminLogin(this.LoginAuth).subscribe((data:any)=>{
      


      if(data.data.token){

        this.loader = false;
        this.toastr.success(data.message);
        localStorage.setItem('adminToken',data.data.token);
        localStorage.setItem('name',data.data.first_name);
        localStorage.setItem('Username',data.data.user_name);
        window.location.href = '/dashboard';
      }else{

        this.toastr.error(data.message);
        this.loader = false;
        
      }

     
    })
 
  }

}

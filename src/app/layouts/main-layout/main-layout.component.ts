import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  constructor(private toastr: ToastrService) { }


   name = localStorage.getItem('name');
   username = localStorage.getItem('Username');


  

  

  ngOnInit(): void {

  

    
  }

  logout(){
    localStorage.removeItem('adminToken');
    localStorage.removeItem('name');
    window.location.href = '/';
  }


  toggleSidebar()
  {
    $('#side-wrapper').toggleClass('side-wrapper');
    $('#side-wrapper').toggleClass('half-collapsed');
    $('#content-wrapper').toggleClass('content-wrapper');
    $('#content-wrapper').toggleClass('content-wrapper-collapse');
  }
  mobileSidebar(){
    $('#mobile-sidebar').toggleClass('side-active');
  }
  mobileSidebarClose(){
    $('#mobile-sidebar').toggleClass('side-active');
  }
  profileDropdown(){
    $('#profile-ddmenu').toggleClass('drop-down-menu');
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminapiService } from 'src/app/api/adminapi.service';
import { ChartDataset, ChartOptions } from 'chart.js';

import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private toastr: ToastrService, private api: AdminapiService) {}
  @Input() monthInsight: any={};
  dashboardCount: any = {};
  chartData: any;
  labelData: any = [];
  countData: any = [];
  pieData: any;
  pieLabelData: any = [];
  pieCountData: any = [];
  type = 'bar';
  options = {
     responsive: true,
     maintainAspectRatio: true,
     scales: {
         yAxes : [{
             ticks : {
                  beginAtZero : true


                
             }

         }],
         
     }
 };

 pieType = 'pie';
 


 data:any;
 barchart:any;

  ngOnInit(): void {


    


    this.api.getDashboard().subscribe((data: any) => {
      this.dashboardCount = data.data;
    });

       //web api call
       let data = {
        "month": this.monthInsight.month,
        "year": this.monthInsight.year
      }
  this.api.getMonthlySales(data).subscribe(data => {
     this.barchart = data.data
  
     if(this.barchart){
      this.labelData = [];
      this.countData = [];
      this.barchart.forEach((element: any) => {
        /*Dates as Month And Day */
        let date = new Date(element.date);
        let month = date.toLocaleString('default', { month: 'short' });
        let day = date.getDate();
        this.labelData.push(month + ' ' + day);
        
        // this.labelData.push(element.date );
        this.countData.push(element.count);
      });
     
     
    
     this.data = {
         labels: this.labelData,
         datasets: [
          {
            label: 'date',
            data: this.countData,
            fill: false,
            borderColor: '#43dcbd',
            backgroundColor: '#43dcbd',
          
  
          },
          
        
          
         ],
  
     };
    }
  })

    
    this.api.getSalesInsights().subscribe((data: any) => {
      this.pieData = data.data;
      if (this.pieData != null) {
        for (const [key, value] of Object.entries(this.pieData)) {
          this.pieLabelData.push(key);
          this.pieCountData.push(value);
        }
        console.log(this.pieLabelData);
        console.log(this.pieCountData);
      }
      this.RenderPieChart(this.pieLabelData, this.pieCountData);
    });

   

 

 /*Render Chart Not Visible After Resize only */

       
  }
  getMonthInsight(){
    //web api call
    let data = {
      "month": this.monthInsight.month,
      "year": this.monthInsight.year
    }
this.api.getMonthlySales(data).subscribe(data => {
   this.barchart = data.data

   if(this.barchart){
    this.labelData = [];
    this.countData = [];
    this.barchart.forEach((element: any) => {
      /*Dates as Month And Day */
      let date = new Date(element.date);
      let month = date.toLocaleString('default', { month: 'short' });
      let day = date.getDate();
      this.labelData.push(month + ' ' + day);
      
      // this.labelData.push(element.date );
      this.countData.push(element.count);
    });
   
   
  
   this.data = {
       labels: this.labelData,
       datasets: [
        {
          label: 'date',
          data: this.countData,
          fill: false,
          borderColor: '#43dcbd',
          backgroundColor: '#43dcbd',
        

        },
        
      
        
       ],

   };
  }
})
  }

  RenderPieChart(pieLabelData: any, pieCountData: any) {
    
    const mypieChart = new Chart('salesInsight', {
      type: 'doughnut',
      data: {
        labels: pieLabelData,
        datasets: [
          {
            label: '# of Votes',
            data: pieCountData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
     
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        
        
      },
     
    });
  }


 
  
  
}

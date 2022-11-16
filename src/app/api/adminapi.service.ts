import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError,Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AdminapiService {

  apiURL: string = 'http://127.0.0.1/api/';


  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
    }),
  };

  posthttpOptions = {
    headers: new HttpHeaders({
     
      'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
    })
  };


  private refreshNeeded$ = new Subject<void>();

  getrefreshNeeded() {
    return this.refreshNeeded$;
  }

  /* == Products == */

  getProducts(): Observable<any> {
    return this.http.post(this.apiURL + 'products/list', {},this.httpOptions);
  }
  createProduct(product: FormData): Observable<any> {
    return this.http.post<string>(this.apiURL + 'products/create', product,this.posthttpOptions).pipe( tap(() => {
      this.refreshNeeded$.next();
    }) );
  }
  getProductById(id: any): Observable<any> {
    return this.http.get(this.apiURL + 'products/get?id='+id,this.httpOptions);
  }
  updateProduct(product: any): Observable<any> {
    return this.http.post(this.apiURL + 'products/update', product,this.posthttpOptions).pipe( tap(() => {
      this.refreshNeeded$.next();
    }) );
  }
  deleteProduct(id: any): Observable<any> {
    return this.http.get(this.apiURL + 'products/delete?id='+id,this.httpOptions).pipe( tap(() => {
      this.refreshNeeded$.next();
    }) );
  }

  /* == Banners == */

  getBanners(): Observable<any> {
    return this.http.get(this.apiURL + 'banner/list',this.httpOptions);
  }
  getBannerById(id: any): Observable<any> {
    return this.http.post(this.apiURL + 'banner/getById', id, this.httpOptions);
  }
  createBanner(banner: FormData): Observable<any> {
    return this.http.post<string>(this.apiURL + 'banner/create',banner,this.posthttpOptions).pipe( tap(() => {
      this.refreshNeeded$.next();
    }) );
  }
  updateBanner(banner: FormData): Observable<any> {
    return this.http.post<string>(this.apiURL + 'banner/update', banner,this.posthttpOptions).pipe( tap(() => {
      this.refreshNeeded$.next();
    }) );
  }
  deleteBanner(id: any): Observable<any> {
    return this.http.post(this.apiURL + 'banner/delete',id, this.httpOptions).pipe( tap(() => {
      this.refreshNeeded$.next();
    }) );
  }

  /* == Category == */

  getCategories(): Observable<any> {
    return this.http.get(this.apiURL + 'category/list',this.httpOptions);
  }
  categoryGetById(id: any): Observable<any> {
    return this.http.post(this.apiURL + 'category/getById', id, this.httpOptions);
  }
  createCategory(category: FormData): Observable<any> {
    return this.http.post<string>(this.apiURL + 'category/create', category,this.posthttpOptions).pipe( tap(() => {
      this.refreshNeeded$.next();
    }) );
  }
  updateCategory(category: FormData): Observable<any> {
    return this.http.post<string>(this.apiURL + 'category/update', category,this.posthttpOptions).pipe( tap(() => {
      this.refreshNeeded$.next();
    }) );
  }
  deleteCategory(id: any): Observable<any> {
    return this.http.post(this.apiURL + 'category/delete',id, this.httpOptions).pipe( tap(() => {
      this.refreshNeeded$.next();
    }), );
  }


  /* == Order == */

  getOrders(): Observable<any> {
    return this.http.post(this.apiURL + 'orders/list', {},this.httpOptions);
  }



  /*Vendor */
  getVendors(): Observable<any> {
    return this.http.get(this.apiURL + 'vendor/list',this.httpOptions);
    
  }



  /* == User == */



  /* == Dashboard == */

  getDashboard(): Observable<any> {
    return this.http.post(this.apiURL + 'admin/dashboard-count', {},this.httpOptions);
  }

  getMonthlySales(data:any): Observable<any> {
    return this.http.post(this.apiURL + 'admin/monthly_sales',data ,this.httpOptions);
  }

  getSalesInsights(): Observable<any> {
    return this.http.post(this.apiURL + 'admin/sales-insights', {},this.httpOptions);
  }



  /* == Login == */

  adminLogin(user: any): Observable<any> {
    return this.http.post(this.apiURL + 'admin/signin', user, this.httpOptions);
  }



  /* == Logout == */



  /* == Register == */




  /* == Forgot Password == */




  /* == Reset Password == */




  /* == Change Password == */




  /* == Profile == */




  /* == Verify Email == */




  /* == Verify Phone == */




  /* == Verify OTP == */




  /* == Resend OTP == */




  /* == Verify OTP == */




  /* == Resend OTP == */





}

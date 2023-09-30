import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap ,switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products$: Observable<any[]>;
  products:any;
  private product$: Observable<any[]>;
  private baseUrl = 'http://localhost:3000/products/allProducts';

  constructor(private http: HttpClient) { }

  fetchProducts(): Observable<any[]> {
    this.products$ = this.http.get<any[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.error('Error sending get request', error);
        throw error;
      }),
      tap((data) => {
       
        this.products$ = of(data);
      })
    );

    return this.products$;
  }

  getStoredProducts(): Observable<any[]> {
    if (this.products$) {
      return this.products$;
    } else {
    
      return this.fetchProducts();
    }
  }


  fetchProduct(id: any): Observable<any | null> {
    return this.getStoredProducts().pipe(
      switchMap((products) => {
        const myproduct = products.find(product => product._id == id);
        return of(myproduct || null);
      })
    );
  }

  getProduct(id: any): Observable<any | null> {
    return this.fetchProduct(id);
  }
}

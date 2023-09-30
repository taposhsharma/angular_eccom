import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart-info',
  templateUrl: './cart-info.component.html',
  styleUrls: ['./cart-info.component.css']
})
export class CartInfoComponent implements OnInit {

  cart:any
  responseData:any
  constructor(private store:Store,private authService: AuthService,private router:Router,private http :HttpClient){
   
  }

  ngOnInit(){
    const token = this.authService.getAuthToken()
    if(!token){
      this.router.navigate(['/login'])
    }

    const url = 'http://localhost:3000/cart'; 
  
    this.http.get(url)
    .pipe(
      catchError((error) => {
      
        console.error('Error sending POST request', error);
        throw error;
      })
    )
    .subscribe((response) => {
      console.log('POST request successful', response);
      this.responseData = response
      this.cart = this.responseData.items
      const product = this.cart.product
    console.log(product)
    
      })
     
      
  }

  delete(id){
    console.log(id)
    this.cart = this.cart.filter(item => item.product._id != id)
    const PostData ={
      itemId:id
    }
  console.log(PostData)
  const url = 'http://localhost:3000/cart/products/delete'; 
    
  this.http.post(url,PostData)
  .pipe(
    catchError((error) => {
    
      console.error('Error sending POST request', error);
      throw error;
    })
  )
  .subscribe((response) => {
    console.log('POST request successful', response);
  
  
  
    })
  }

}

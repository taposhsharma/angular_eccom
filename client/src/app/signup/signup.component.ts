import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as MyActions from '../../store/app.actions';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit{
  signupForm: FormGroup;
  responseData :any
 
  
  isLogin: boolean | undefined;
  isAuthenticated: boolean = false;

  constructor(private fb: FormBuilder,private http: HttpClient,private store: Store,private authService: AuthService,private router:Router) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    const token = this.authService.getAuthToken()
    if(token){
     
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    console.log('hello')
    if (this.signupForm.valid) {
      
      console.log(this.signupForm.value.firstName);

      const postData = {
         ...this.signupForm.value
      };
  
      const url = 'http://localhost:3000/users/signup'; 
  
      this.http.post(url, postData)
      .pipe(
        catchError((error) => {
        
          console.error('Error sending POST request', error);
          throw error;
        })
      )
      .subscribe((response) => {
        console.log('POST request successful', response);

        this.responseData =response
        if(this.responseData){
        const user = this.responseData.user
        const authToken = this.responseData.token  
        this.authService.setAuthData(user,authToken);
        this.isAuthenticated = true;
        this.store.dispatch(MyActions.login());
        this.router.navigate(['/']);
      
        }
       
      });
    }
  }
}

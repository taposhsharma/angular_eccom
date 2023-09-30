import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLogin } from '../../store/app.selector';
import { take } from 'rxjs/operators';
import * as MyActions from '../../store/app.actions';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin:boolean =true
  

  constructor(private store:Store,private authService: AuthService,private router:Router){
   
  }
ngOnInit(){
  
    const token = this.authService.getAuthToken()
    console.log(token)
    if(token){
      this.store.dispatch(MyActions.login());
      
    }
  this.store.select(selectIsLogin).subscribe((isLogin) => {
    this.isLogin = isLogin;
  });
}
login(){
  this.router.navigate(['/login'])
}
logout(){
  this.authService.logout();
  this.store.dispatch(MyActions.logout());
  this.router.navigate(['/'])

}

}

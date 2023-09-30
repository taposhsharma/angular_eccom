import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartInfoComponent } from 'src/app/cart-info/cart-info.component';
import { HomeComponent } from 'src/app/home/home.component';
import { ItemComponent } from 'src/app/item/item.component';
import { LoginComponent } from 'src/app/login/login.component';
import { SignupComponent } from 'src/app/signup/signup.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
    {path:'login', component:LoginComponent},
    {path:'signup', component:SignupComponent},
    {path:'product/:id', component:ItemComponent},
    {path:'cart',component:CartInfoComponent}
    
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
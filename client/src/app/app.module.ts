import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from 'src/router/app-router.module';
import { SignupComponent } from './signup/signup.component';

import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducer } from '../store/app.reduers';
import { MyEffects } from '../store/app.effects';

import { AuthorizationInterceptor } from './authorization.interceptor';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ItemComponent } from './item/item.component';
import { CartInfoComponent } from './cart-info/cart-info.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ProductComponent,
    ItemComponent,
    CartInfoComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ myFeature: reducer }),
    EffectsModule.forRoot([MyEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true, // Set to true to allow multiple interceptors
    },
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }

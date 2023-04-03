import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RoutingModule } from './router.module';
import { ProductListService } from './product-list/product-list.service';
import { ProductDetailService } from './product-details/product-details.service';
import { HomeModule } from './home/home.module';
import { SignInModule } from './sign-in/sign-in.module';
import { SignInService } from './sign-in/sign-in.service';
import { AuthInterceptor } from './interceptors';
import { HttpService } from './https/http.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarService } from './navbar/navbar.service';
import { GuardService } from './guard/guard.service';
import { ProductDetailsModule } from './product-details/product-details.module';

const ProductListServiceProvider: Provider = {
  provide: 'ProductListService',
  useClass: ProductListService,
};

const ProductDetailServiceProvider: Provider = {
  provide: 'ProductDetailService',
  useClass: ProductDetailService,
};

const SignInServiceProvider: Provider = {
  provide: 'SignInService',
  useClass: SignInService,
};

const AuthInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};

const HttpServiceProvider: Provider = {
  provide: 'HttpService',
  useClass: HttpService,
};

const NavbarServiceProvider: Provider = {
  provide: 'NavbarService',
  useClass: NavbarService,
};

@NgModule({
  declarations: [AppComponent, ProductListComponent, NavbarComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    HomeModule,
    SignInModule,
    ProductDetailsModule,
  ],
  providers: [
    ProductListServiceProvider,
    ProductDetailServiceProvider,
    SignInServiceProvider,
    AuthInterceptorProvider,
    HttpServiceProvider,
    NavbarServiceProvider,
    GuardService,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}

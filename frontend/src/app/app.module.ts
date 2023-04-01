import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RoutingModule } from './router.module';
import { ProductListService } from './product-list/product-list.service';
import { ProductDetailService } from './product-details/product-details.service';
import { HomeModule } from './home/home.module';
import { SignInModule } from './sign-in/sign-in.module';
import { SignInService } from './sign-in.service';
import { AuthInterceptor } from './interceptors';
import { HttpService } from './https/http.service';

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

@NgModule({
  declarations: [AppComponent, ProductDetailsComponent, ProductListComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    HomeModule,
    SignInModule,
  ],
  providers: [
    ProductListServiceProvider,
    ProductDetailServiceProvider,
    SignInServiceProvider,
    AuthInterceptorProvider,
    HttpServiceProvider,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}

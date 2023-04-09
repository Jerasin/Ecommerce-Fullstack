import { NgModule, OnInit, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from '../app.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { RoutingModule } from '../router.module';
import { ProductListService } from '../product-list/product-list.service';
import { ProductDetailService } from '../product-details/product-details.service';
import { HomeModule } from './home.module';
import { SignInModule } from '../sign-in/sign-in.module';
import { SignInService } from '../sign-in/sign-in.service';
import { AuthInterceptor } from '../interceptors';
import { HttpService } from '../https/http.service';
import { NavbarService } from '../navbar/navbar.service';
import { GuardService } from '../guard/guard.service';
import { ProductDetailsModule } from '../product-details/product-details.module';
import { environment } from 'src/environments/environment';
import { NavbarModule } from '../navbar/navbar.module';
import { OrderModule } from '../order/order.module';
import { OrderService } from '../order/order.service';
import { TransactionService } from '../transaction/transaction.service';
import { HomeService } from './home.service';
import { CategoryComponent } from '../category/category.component';
import { CategoryService } from '../category/category.service';
import { SignUpModule } from '../sign-up/sign-up.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

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

const OrderServiceProvider: Provider = {
  provide: 'OrderService',
  useClass: OrderService,
};

const TransactionServiceProvider: Provider = {
  provide: 'TransactionService',
  useClass: TransactionService,
};

const HomeServiceProvider: Provider = {
  provide: 'HomeService',
  useClass: HomeService,
};

const CategoryServiceProvider: Provider = {
  provide: 'CategoryService',
  useClass: CategoryService,
};

const UserServiceProvider: Provider = {
  provide: 'UserService',
  useClass: UserService,
};

@NgModule({
  declarations: [AppComponent, ProductListComponent, CategoryComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    HomeModule,
    SignInModule,
    ProductDetailsModule,
    NavbarModule,
    OrderModule,
    SignUpModule,
    UserModule,
  ],
  providers: [
    ProductListServiceProvider,
    ProductDetailServiceProvider,
    SignInServiceProvider,
    AuthInterceptorProvider,
    HttpServiceProvider,
    NavbarServiceProvider,
    GuardService,
    OrderServiceProvider,
    TransactionServiceProvider,
    HomeServiceProvider,
    CategoryServiceProvider,
    UserServiceProvider,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule implements OnInit {
  ngOnInit(): void {
    console.log('environment', environment);
  }
}

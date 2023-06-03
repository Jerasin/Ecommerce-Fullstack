import { NgModule, OnInit, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductListModule } from './product-list';
import { RoutingModule } from './router.module';
import { HomeModule } from './home';
import { SignInModule } from './sign-in';
import { AuthInterceptor } from './interceptors';
import { HttpService } from './https/http.service';
import { GuardService } from './guard';
import { ProductDetailsModule } from './product-details';
import { environment } from 'src/environments/environment';
import { NavbarModule } from './navbar/navbar.module';
import { OrderModule } from './order';
import { TransactionModule } from './transaction';
import { CategoryModule } from './category';
import { SignUpModule } from './sign-up';
import { UserModule } from './user';
import { HistoryModule } from './history';
import { OrderDetailModule } from './order-detail';
import { DashboardModule } from './dashboard';
import { LayoutModule } from './layout';
import { ShareModule } from './share';

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
  declarations: [AppComponent],
  imports: [
    RoutingModule,
    LayoutModule,
    BrowserModule,
    HttpClientModule,
    HomeModule,
    SignInModule,
    ProductDetailsModule,
    NavbarModule,
    OrderModule,
    SignUpModule,
    UserModule,
    HistoryModule,
    DashboardModule,
    ProductListModule,
    TransactionModule,
    CategoryModule,
    OrderDetailModule,
    ShareModule,
  ],
  providers: [AuthInterceptorProvider, HttpServiceProvider, GuardService],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule implements OnInit {
  ngOnInit(): void {
    console.log('environment', environment);
  }
}

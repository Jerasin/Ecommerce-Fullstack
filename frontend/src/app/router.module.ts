import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { privateRoute, publicRoute, adminRoute } from './guard/guard.service';
import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserComponent } from './user/user.component';
import { HistoryComponent } from './history/history.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [privateRoute],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      test: 1,
    },
    canActivate: [adminRoute],
  },
  {
    path: 'product/:productId',
    component: ProductListComponent,
    canActivate: [privateRoute],
  },
  {
    path: 'products/:categoryId',
    component: ProductListComponent,
    canActivate: [privateRoute],
  },
  {
    path: 'product-detail/:productId',
    component: ProductDetailsComponent,
    canActivate: [privateRoute],
  },
  {
    path: 'signIn',
    component: SignInComponent,
    canActivate: [publicRoute],
  },
  {
    path: 'signUp',
    component: SignUpComponent,
    canActivate: [publicRoute],
  },
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [privateRoute],
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [privateRoute],
  },
  {
    path: 'user/:userId',
    component: UserComponent,
    canActivate: [privateRoute],
  },
  {
    path: 'history/:userId',
    component: HistoryComponent,
    canActivate: [privateRoute],
  },
  {
    path: 'orderDetail/:orderId',
    component: OrderDetailComponent,
    canActivate: [privateRoute],
  },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class RoutingModule {}

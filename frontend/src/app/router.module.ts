import { NgModule, Provider } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { privateRoute, publicRoute } from './guard/guard.service';

const routes: Routes = [
  {
    path: 'products',
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
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
  ],
  exports: [RouterModule],
})
export class RoutingModule {}

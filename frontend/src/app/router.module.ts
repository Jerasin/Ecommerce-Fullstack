import { NgModule, Provider } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { privateRoute, publicRoute } from './guard/guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [privateRoute],
  },
  { path: 'product-detail/:productId', component: ProductDetailsComponent },
  { path: 'signIn', component: SignInComponent, canActivate: [publicRoute] },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}

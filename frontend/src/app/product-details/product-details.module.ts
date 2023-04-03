import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details.component';
import { RoutingModule } from '../router.module';

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [CommonModule, ReactiveFormsModule, RoutingModule],
  exports: [ProductDetailsComponent],
})
export class ProductDetailsModule {}

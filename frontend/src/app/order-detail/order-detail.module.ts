import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailComponent } from './order-detail.component';

const OrderDetailServiceProvider: Provider = {
  provide: 'OrderDetailService',
  useClass: OrderDetailService,
};

@NgModule({
  declarations: [OrderDetailComponent],
  providers: [OrderDetailServiceProvider],
  imports: [CommonModule],
})
export class OrderDetailModule {}

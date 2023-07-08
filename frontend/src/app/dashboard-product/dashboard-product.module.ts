import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardProductComponent } from './dashboard-product.component';
import { DashboardProductService } from './dashboard-product.service';
import { MatIconModule } from '@angular/material/icon';

const DashboardProductServiceProvider: Provider = {
  provide: 'DashboardProductService',
  useClass: DashboardProductService,
};

@NgModule({
  declarations: [DashboardProductComponent],
  imports: [CommonModule, MatIconModule],
  providers: [DashboardProductServiceProvider],
})
export class DashboardProductModule {}

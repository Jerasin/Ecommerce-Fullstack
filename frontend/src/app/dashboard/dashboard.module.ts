import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard.component';
import { RoutingModule } from '../router.module';
import { DashboardService } from './dashboard.service';

const DashboardServiceProvider: Provider = {
  provide: 'DashboardService',
  useClass: DashboardService,
};

@NgModule({
  declarations: [DashboardComponent],
  providers: [DashboardServiceProvider],
  imports: [CommonModule, MatIconModule, RoutingModule],
})
export class DashboardModule {}

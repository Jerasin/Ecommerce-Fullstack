import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard.component';
import { RoutingModule } from '../router.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, MatIconModule, RoutingModule],
})
export class DashboardModule {}

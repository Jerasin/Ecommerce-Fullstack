import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RoutingModule } from '../router.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RoutingModule],

  exports: [HomeComponent],
})
export class HomeModule {}

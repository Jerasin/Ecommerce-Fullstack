import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarDashboardComponent } from './navbar-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { ShareService } from '../share';

const ShareServiceProvider: Provider = {
  provide: 'ShareService',
  useClass: ShareService,
};

@NgModule({
  declarations: [NavbarDashboardComponent],
  imports: [CommonModule, MatIconModule],
  providers: [ShareServiceProvider],
  exports: [NavbarDashboardComponent],
})
export class NavbarDashboardModule {}

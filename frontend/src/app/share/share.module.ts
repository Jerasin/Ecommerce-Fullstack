import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareService } from './share.service';
import { RoutingModule } from '../router.module';
import { NavbarService } from '../navbar';

const NavbarServiceProvider: Provider = {
  provide: 'NavbarService',
  useClass: NavbarService,
};

const ShareServiceProvider: Provider = {
  provide: 'ShareService',
  useClass: ShareService,
};

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ShareServiceProvider, NavbarServiceProvider],
})
export class ShareModule {}

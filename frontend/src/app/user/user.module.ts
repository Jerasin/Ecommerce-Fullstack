import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from '../router.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, RoutingModule, ReactiveFormsModule],
})
export class UserModule {}

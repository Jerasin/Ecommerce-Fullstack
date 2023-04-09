import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignUpComponent],
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
})
export class SignUpModule {}

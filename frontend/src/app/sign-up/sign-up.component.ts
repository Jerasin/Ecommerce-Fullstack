import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  async onSubmit() {
    const { email, password } = this.signUpForm.value;

    if (email == null || password == null) return;
    // return this.signInService.signIn({ email, password });
  }
}

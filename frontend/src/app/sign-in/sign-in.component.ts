import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SignInService } from '../sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  constructor(@Inject('SignInService') private signInService: SignInService) {}

  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  async onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.signInForm.value);

    const { email, password } = this.signInForm.value;

    if (email == null || password == null) return;
    return this.signInService.signIn({ email, password });
  }
}

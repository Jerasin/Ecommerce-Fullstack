import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  userForm = new FormGroup({
    id: new FormControl(null),
    address: new FormControl(null),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject('UserService') private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('userId'));

    this.userService.getUser(productIdFromRoute).subscribe({
      next: (value) => {
        this.firstName = value.firstName;
        this.lastName = value.lastName;
        this.email = value.email;

        this.userForm.setValue({
          id: value.id,
          address: value.address,
        });
      },
    });
  }

  public updateUser() {
    const { id, address } = this.userForm.value;

    if (id != null && address != null) {
      this.userService.updateUser(id, { address }).subscribe({
        next: (value) => {
          this.router.navigate(['products']);
        },
      });
    }
  }
}

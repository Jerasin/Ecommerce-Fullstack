import { Component, Inject, OnInit } from '@angular/core';

import { Product } from '../../mock/productList';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from './product-details.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'product-detail',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css', '../app.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  // product: Product | undefined;
  imageSrc: any = null;

  productForm = new FormGroup({
    id: new FormControl(0),
    price: new FormControl(0),
    description: new FormControl(''),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject('ProductDetailService')
    private productDetailService: ProductDetailService
  ) {}

  async ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
    const productById = this.productDetailService
      .getProduct(productIdFromRoute)
      .subscribe(
        (data) => {
          this.productForm.setValue({
            id: data.id,
            price: data.price,
            description: data.description ?? '',
          });

          if (data.img != null) {
            this.imageSrc = `http://localhost:3000/images/${data.img}`;
          }
        },
        (e) => {
          if (e.status == 401) {
            localStorage.removeItem('token');
            this.router.navigate(['signIn']);
          }
        }
      );
  }

  async updateProduct() {
    console.log('updateProduct', this.productForm.value);
    const { id, price, description } = this.productForm.value;

    if (id == null || price == null) return;

    // await this.productDetailService.updateProduct({
    //   id,
    //   price,
    //   description: description ?? '',
    // });

    if (this.imageSrc != null) {
      await this.uploadImage();
    }

    // this.router.navigate(['products']);
  }

  readURL(event: any): void {
    if (event.target.files != null && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);
    }
  }

  async uploadImage() {
    console.log('img', this.imageSrc);
  }
}

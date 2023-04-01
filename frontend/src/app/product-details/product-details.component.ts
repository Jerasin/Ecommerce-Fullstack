import { Component, Inject, OnInit } from '@angular/core';

import { productList, Product } from '../../mock/productList';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from './product-details.service';

@Component({
  selector: 'product-detail',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css', '../app.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    @Inject('ProductDetailService')
    private productDetailService: ProductDetailService
  ) {}

  async ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
    const productById = await this.productDetailService.getProduct(
      productIdFromRoute
    );

    // Find the product that correspond with the id provided in route.
    this.product = productById;
  }
}

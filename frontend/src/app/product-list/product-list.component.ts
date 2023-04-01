import { Component, Inject, OnInit } from '@angular/core';
import { Product } from '../../mock/productList';
import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css', '../app.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] | undefined;

  constructor(
    @Inject('ProductListService') private productListService: ProductListService
  ) {}

  async ngOnInit(): Promise<void> {
    console.log('ngOnInit is running...');
    const result = await this.productListService.getProducts();

    this.products = result;
  }
}

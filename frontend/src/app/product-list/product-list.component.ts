import { Component, Inject, OnInit } from '@angular/core';
import { Product } from '../../mock/productList';
import { ProductListService } from './product-list.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css', '../app.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] | undefined;
  role: string | undefined;
  constructor(
    @Inject('ProductListService') private productListService: ProductListService
  ) {}

  async ngOnInit(): Promise<void> {
    console.log('ngOnInit is running...');
    const result = await this.productListService.getProducts();
    const token = localStorage.getItem('token');

    if (token != null) {
      const decoded = jwt_decode(token) as Record<string, any>;
      this.role = decoded['role'];
    }

    this.products = result;
  }
}

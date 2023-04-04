import { Component, Inject, OnInit } from '@angular/core';
import { Product } from '../../mock/productList';
import { ProductListService } from './product-list.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css', '../app.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  result: Product[] = [];
  role: string | undefined;
  constructor(
    @Inject('ProductListService')
    private productListService: ProductListService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.productListService.getProducts().subscribe(
      (result: Product[]) => {
        this.products = result.map((product: Product) => {
          return {
            ...product,
            img:
              product.img != null
                ? `http://localhost:3000/images/${product.img}`
                : '',
          };
        });
      },
      (e) => {
        if (e.status == 401) {
          localStorage.removeItem('token');
          this.router.navigate(['signIn']);
        }
      }
    );
    const token = localStorage.getItem('token');

    if (token != null) {
      const decoded = jwt_decode(token) as Record<string, any>;
      this.role = decoded['role'];
    }
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { Product } from '../../mock/productList';
import { ProductListService } from './product-list.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { forkJoin } from 'rxjs';
import { NavbarService, SelectItem } from '../navbar/navbar.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseTypeOption } from '../../interfaces/base.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css', '../app.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  result: Product[] = [];
  role: string | undefined;
  selectItem: SelectItem[] = [];
  itemIdFromRoute: BaseTypeOption = null;

  constructor(
    @Inject('ProductListService')
    private productListService: ProductListService,
    @Inject('NavbarService') private navbarService: NavbarService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.navbarService.getSelectItem().subscribe({
      next: (value) => {
        this.selectItem = value;
      },
    });
  }

  async ngOnInit(): Promise<void> {
    const routeParams = this.activatedRoute.snapshot.paramMap;

    if (routeParams.get('categoryId') != null) {
      this.itemIdFromRoute = {
        categoryId: Number(routeParams.get('categoryId')),
      };
    } else if (routeParams.get('productId') != null) {
      this.itemIdFromRoute = {
        productId: Number(routeParams.get('productId')),
      };
    }

    forkJoin({
      getProducts: this.calculateRedirectProductPage(this.itemIdFromRoute),
      getWareHouses: this.productListService.getWareHouses(),
    }).subscribe({
      next: ({ getProducts, getWareHouses }) => {
        if (!Array.isArray(getProducts)) {
          getProducts = [getProducts];
        }

        this.products = getProducts.map((product: Product) => {
          const findWareHouse = getWareHouses.find(
            (value: any) => value.productId == product.id
          );
          return {
            ...product,
            img:
              product.img != null
                ? `${environment.apiUrl}/images/${product.img}?${Date.now()}`
                : '/assets/images/noImage.jpg',
            available: findWareHouse?.amount,
          };
        });
      },
      error: (err) => {
        if (err.status == 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('shopping');
          this.navbarService.setIsShowSignIn(false);
          this.router.navigate(['signIn']);
        }
      },
    });

    const token = localStorage.getItem('token');

    if (token != null) {
      const decoded = jwt_decode(token) as Record<string, any>;
      this.role = decoded['role'];
    }
  }

  public setShoppingCar(value: Product) {
    const findItem = this.selectItem.findIndex((e) => e.productId == value.id);

    if (findItem == -1) {
      this.selectItem.push({
        productId: value.id,
        amount: 1,
        name: value.name,
        price: value.price,
      });
    } else {
      this.selectItem[findItem]['amount'] += 1;
    }

    localStorage.setItem('shopping', JSON.stringify(this.selectItem));
    this.navbarService.setSelectItem(this.selectItem);
  }

  private calculateRedirectProductPage(
    options: BaseTypeOption
  ): Observable<any> {
    if (options?.categoryId != null) {
      return this.productListService.getProductByCategory(options.categoryId);
    } else if (options?.productId != null) {
      return this.productListService.getProductById(options.productId);
    } else {
      return this.productListService.getProducts();
    }
  }
}

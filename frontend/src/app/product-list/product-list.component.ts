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
  productIdFromRoute: number | null = null;
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
      this.productIdFromRoute = Number(routeParams.get('categoryId'));
    }

    forkJoin({
      getProducts: this.calculateRedirectProductPage(this.productIdFromRoute),
      getWareHouses: this.productListService.getWareHouses(),
    }).subscribe({
      next: ({ getProducts, getWareHouses }) => {
        console.log('getProducts', getProducts);
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

  private calculateRedirectProductPage(categoryId: number): Observable<any> {
    console.log('categoryId', categoryId);

    if (categoryId != null) {
      return this.productListService.getProductByCategory(categoryId);
    } else {
      return this.productListService.getProducts();
    }
  }
}

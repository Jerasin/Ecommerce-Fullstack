import { Component, Inject, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from '../../interfaces/category.interface';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  constructor(
    @Inject('CategoryService') private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe({
      next: (value) => {
        this.categories = value.map((item) => {
          return {
            ...item,
            img:
              item.img != null
                ? `${environment.apiUrl}/images/${item.img}?${Date.now()}`
                : '/assets/images/noImage.jpg',
          };
        });
      },
    });
  }
}

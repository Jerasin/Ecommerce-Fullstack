import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from './category.service';
import { CategoryComponent } from './category.component';
import { RoutingModule } from '../router.module';

const CategoryServiceProvider: Provider = {
  provide: 'CategoryService',
  useClass: CategoryService,
};

@NgModule({
  declarations: [CategoryComponent],
  providers: [CategoryServiceProvider],
  imports: [CommonModule, RoutingModule],
})
export class CategoryModule {}

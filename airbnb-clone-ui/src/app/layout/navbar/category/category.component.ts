import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Category, CategoryName } from '../../../models/category.model';
import { Component, OnInit, inject } from '@angular/core';
import { filter, map } from 'rxjs';

import { CategoryService } from '../../../services/category.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  categoryService = inject(CategoryService);

  categories: Category[] | undefined;

  currentActivateCategory = this.categoryService.getCategoryByDefault();

  isHome = false;
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.listenRouter();
    this.currentActivateCategory.activated = false;
    this.fetchCategories();
  }

  private fetchCategories() {
    this.categories = this.categoryService.getCategories();
  }

  private listenRouter() {
    this.router.events
      .pipe(filter((evt): evt is NavigationEnd => evt instanceof NavigationEnd))
      .subscribe({
        next: (evt: NavigationEnd) => {
          this.isHome = evt.url.split('?')[0] === '/';
          if (this.isHome && evt.url.indexOf('?') === -1) {
            const categoryByTechnicalName =
              this.categoryService.getCategoryByTechnicalName('ALL');
            this.categoryService.changeCategory(categoryByTechnicalName!);
          }
        },
      });

    this.activatedRoute.queryParams
      .pipe(map((params) => params['category']))
      .subscribe({
        next: (categoryName: CategoryName) => {
          const category =
            this.categoryService.getCategoryByTechnicalName(categoryName);
          if (category) {
            this.activateCategory(category);
            this.categoryService.changeCategory(category);
          }
        },
      });
  }

  private activateCategory(category: Category) {
    this.currentActivateCategory.activated = false;
    this.currentActivateCategory = category;
    this.currentActivateCategory.activated = true;
  }

  onChangeCategory(category: Category) {
    this.activateCategory(category);
    this.router.navigate([], {
      queryParams: { category: category.technicalName },
      relativeTo: this.activatedRoute,
    });
  }
}

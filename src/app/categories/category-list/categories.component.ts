import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  incomeCategories;
  expenseCategories;
  isFormVisible = false;

  constructor(private categoriesService: CategoriesService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.url.subscribe((routDetails) => {
      this.isFormVisible = this.route.children.length === 1;
      this.incomeCategories = this.categoriesService.getCategories('INCOME', true);
      this.expenseCategories = this.categoriesService.getCategories('EXPENSE', true);
    });
  }

  onItemClicked = async (item) => {
    await this.router.navigate(['/categories/edit', item.name]);
  };
}

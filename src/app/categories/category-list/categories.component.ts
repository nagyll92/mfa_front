import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories;
  displayedColumns: string[] = ['name', 'icon', 'actions'];

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.categories = this.categoriesService.getCategories();
  }

}

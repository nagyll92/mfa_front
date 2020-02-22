import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories;


  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categories = this.categoriesService.getCategories().toPromise().then(categoryList => {
      return this.parseCategories(categoryList, null);
    });
  }

  private parseCategories(inputArray, parent) {
    const output = [];
    for (const item of inputArray) {
      if (item.parent === parent) {
        const children = this.parseCategories(inputArray.filter(cat => cat.name !== item.name), item.name);
        if (children.length) {
          item.children = children;
        }
        output.push(item);
      }
    }
    return output;
  }

  onItemClicked(item) {
    console.log('item clicked', item);
  }
}

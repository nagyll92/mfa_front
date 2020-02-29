import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogComponent } from '../../components/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { IconsService } from '../../icons.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  categoryList = [];
  editedCategory: string = null;
  categoryForm: FormGroup;
  categoryTypes = [{ label: 'Income', type: 'INCOME' }, { label: 'Expense', type: 'EXPENSE' }];
  selectableCategories;
  icons = [{ icon: 'build', label: 'build' }, { icon: 'edit', label: 'edit' }, { icon: 'bills', label: 'bills' }];

  constructor(
    private categoriesService: CategoriesService,
    private iconsService: IconsService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
    this.icons = iconsService.categoryIcons.map(icon => ({ label: icon, icon }));
  }

  onDeleteButtonClicked() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to remove account "' + this.editedCategory + '"?',
    });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.categoriesService.deleteCategory(this.editedCategory).then(result => {
          if (result.success) {
            return this.router.navigate(['/categories']);
          }
        });
      }
    });
  }

  async onSubmit() {
    if (this.categoryForm.valid) {
      let operationResult;
      if (this.editedCategory === null) {
        operationResult = await this.categoriesService.createCategory(this.categoryForm.value);
      } else {
        operationResult = await this.categoriesService.updateCategory(this.editedCategory, this.categoryForm.value);
      }
      await this.onSubmitFinished(operationResult);
    }
  }

  async onSubmitFinished(result) {
    if (result.success) {
      await this.router.navigate(['/categories']);
    }
  }

  onCategoryChange = () => {
    this.populateCategoryOptions(this.categoryList);
  };

  private filterParent = (item) => {
    return item.name !== this.editedCategory && item.type === this.categoryForm.value.type;
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((routDetails) => {
      const categoryName = routDetails.get('categoryName');
      this.initCategoryForm();
      if (categoryName) {
        this.categoriesService.getCategory(categoryName).subscribe(category => {
          this.editedCategory = category.name;
          this.getCategories();
          this.categoryForm.setValue({
            name: category.name,
            type: category.type,
            parent: category.parent,
            icon: category.icon,
          });
        });
      } else {
        this.getCategories();
      }
    });
  }

  private getCategories() {
    this.categoriesService.getCategories(null, false).toPromise().then(catList => {
      this.populateCategoryOptions(catList);
      this.categoryList = catList;
    });
  }

  private populateCategoryOptions(catList) {
    this.selectableCategories = new Promise(resolve => {
      resolve(catList.filter(this.filterParent));
    });
  }

  private initCategoryForm() {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      type: new FormControl(null, [Validators.required]),
      parent: new FormControl(null),
      icon: new FormControl(null),
    });
  }
}

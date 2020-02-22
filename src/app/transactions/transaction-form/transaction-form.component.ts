import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from '../../transactions.service';
import { CategoriesService } from '../../categories/categories.service';
import { AccountsService } from '../../accounts/accounts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {
  type: 'INCOME' | 'EXPENSE' = 'INCOME';
  transactionFrom: FormGroup;
  categories;
  accounts;

  constructor(
    private transactionService: TransactionsService,
    private categoriesService: CategoriesService,
    private accountsService: AccountsService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  async onSubmit() {
    if (this.transactionFrom.invalid) {
      return;
    }
    const payloadToSend = { ...this.transactionFrom.value };
    payloadToSend.dateTime = new Date(payloadToSend.dateTime).toISOString();
    const operationResult = await this.transactionService.createTransaction(payloadToSend);
    if (operationResult.success) {
      await this.router.navigate(['/dashboard']);
    }
  }

  async ngOnInit() {
    this.accounts = this.accountsService.getAccounts();
    this.route.url.subscribe((routDetails) => {
      const [route] = routDetails;
      if (route.path === 'income') {
        this.type = 'INCOME';
      } else if (route.path === 'expense') {
        this.type = 'EXPENSE';
      }
      this.categories = this.categoriesService.getCategories(this.type);

    });
    this.initTransactionFrom();
  }

  private initTransactionFrom() {
    this.transactionFrom = new FormGroup({
      account: new FormControl('', [Validators.required]),
      amount: new FormControl(null, Validators.required),
      description: new FormControl(''),
      category: new FormControl(null, [Validators.required]),
      dateTime: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
    });
  }

}

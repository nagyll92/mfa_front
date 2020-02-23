import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from '../../transactions.service';
import { CategoriesService } from '../../categories/categories.service';
import { AccountsService } from '../../accounts/accounts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../components/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {
  type: 'INCOME' | 'EXPENSE';
  transactionFrom: FormGroup;
  categories;
  accounts;
  editedTransaction: number = null;

  constructor(
    private transactionService: TransactionsService,
    private categoriesService: CategoriesService,
    private accountsService: AccountsService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) {
  }

  onDeleteButtonClicked() {
    if (this.editedTransaction === null) {
      return;
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to remove?',
    });
    dialogRef.afterClosed().subscribe(async (confirmed) => {
      if (confirmed) {
        const operationResult = await this.transactionService.deleteTransaction(this.editedTransaction);
        if (operationResult.success) {
          await this.router.navigate(['/dashboard']);
        }
      }
    });
  }

  async onSubmit() {
    if (this.transactionFrom.invalid) {
      return;
    }
    const payloadToSend = { ...this.transactionFrom.value };
    payloadToSend.dateTime = new Date(payloadToSend.dateTime).toISOString();
    let operationResult;
    if (this.editedTransaction === null) {
      operationResult = await this.transactionService.createTransaction(payloadToSend);
    } else {
      operationResult = await this.transactionService.updateTransaction(this.editedTransaction, payloadToSend);
    }
    if (operationResult.success) {
      await this.router.navigate(['/dashboard']);
    }
  }

  async ngOnInit() {
    this.accounts = this.accountsService.getAccounts();
    this.route.paramMap.subscribe((routDetails) => {
      const transactionId = routDetails.get('transactionId');
      if (transactionId !== null) {
        this.initEditTransaction(transactionId);
      } else {
        this.initNewTransaction();
      }
    });

    this.initTransactionFrom();
  }

  async initEditTransaction(id) {
    const transaction = await this.transactionService.getTransaction(id).toPromise();
    this.categories = this.categoriesService.getCategories(transaction.type);
    this.editedTransaction = transaction.id;
    this.type = transaction.type;
    this.transactionFrom.setValue({
      account: transaction.account,
      amount: transaction.amount,
      description: transaction.description,
      category: transaction.category,
      dateTime: new Date(transaction.dateTime).toISOString().split('T')[0],
    });
  }

  private initNewTransaction() {
    this.route.url.subscribe((routDetails) => {
      const [route] = routDetails;
      if (route.path === 'income') {
        this.type = 'INCOME';
      } else if (route.path === 'expense') {
        this.type = 'EXPENSE';
      }
      this.categories = this.categoriesService.getCategories(this.type);
    });
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

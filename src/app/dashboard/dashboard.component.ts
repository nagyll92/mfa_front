import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isChildVisible = false;
  transactions;
  displayedColumns = ['dateTime', 'amount', 'account', 'category', 'description'];

  constructor(
    private transactionService: TransactionsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.url.subscribe((routDetails) => {
      this.isChildVisible = this.route.children.length === 1;
      this.transactions = this.transactionService.getTransactions();
    });
  }

  async onTransactionSelected(transaction) {
    await this.router.navigate(['/dashboard/transaction/edit', transaction.id]);
  }

}

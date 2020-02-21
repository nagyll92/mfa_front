import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { ConfirmationDialogComponent } from '../../components/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  accounts;
  displayedColumns: string[] = ['name', 'balance', 'actions'];
  isFormVisible = false;

  constructor(public dialog: MatDialog, private accountsService: AccountsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.url.subscribe((routDetails) => {
      this.isFormVisible = this.route.children.length === 1;
      this.accounts = this.accountsService.getAccounts();
    });
  }

  openDialog(account) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to remove account "' + account.name + '"?',
    });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.accountsService.removeAccount(account.name).subscribe(success => {
          if (success) {
            this.accounts = this.accountsService.getAccounts();
          }
        });
      }
    });

  }

}

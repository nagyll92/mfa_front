import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../accounts.service';
import { ConfirmationDialogComponent } from '../../components/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  accounts;
  displayedColumns: string[] = ['name', 'balance', 'actions'];

  constructor(public dialog: MatDialog, private accountsService: AccountsService) {
  }

  ngOnInit(): void {
    this.accounts = this.accountsService.getAccounts();
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

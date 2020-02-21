import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  accounts;
  displayedColumns: string[] = ['name', 'balance'];


  constructor(private accounstService: AccountsService) {
  }

  ngOnInit(): void {
    this.accounts = this.accounstService.getAccounts();
  }

  onStuffClicked() {
    console.log('stuff clicked', this.accounts.data);
  }

}

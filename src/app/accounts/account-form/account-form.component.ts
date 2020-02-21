import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from '../accounts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent implements OnInit {
  accountForm: FormGroup;
  editedAccount: string = null;

  constructor(private accountsService: AccountsService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  async onSubmit() {
    if (this.accountForm.valid) {

      const payloadToSend = { ...this.accountForm.value };
      payloadToSend.initialBalanceDate = new Date(payloadToSend.initialBalanceDate).toISOString();

      let result = null;

      if (this.editedAccount === null) {
        result = await this.accountsService.createAccount(payloadToSend);
      } else {
        result = await this.accountsService.updateAccount(this.editedAccount, payloadToSend);
      }
      console.log('result', result);
      if (result.success) {
        await this.router.navigate(['/accounts']);
      }
    }
  }

  private async createNewAccount(payloadToSend) {
    const result = await this.accountsService.createAccount(payloadToSend);

    if (result.success) {
      await this.router.navigate(['/accounts']);
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((routDetails) => {
      const accountName = routDetails.get('accountName');
      this.initAccountForm();
      if (accountName) {
        this.accountsService.getAccount(accountName).subscribe(account => {
          this.editedAccount = account.name;
          this.accountForm.setValue({
            name: account.name,
            initialBalance: account.initialBalance,
            initialBalanceDate: account.initialBalanceDate.split('T')[0],
          });
        });
      }
    });
  }

  private initAccountForm(): void {
    this.accountForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      initialBalance: new FormControl(0, Validators.required),
      initialBalanceDate: new FormControl('', [Validators.required]),
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AccountsService } from '../accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit {
  transferForm: FormGroup;
  accountList;

  constructor(private accountsService: AccountsService, private router: Router) {
  }

  async ngOnInit() {

    this.transferForm = new FormGroup({
      amount: new FormControl(null, [Validators.required]),
      from: new FormControl(null, Validators.required),
      to: new FormControl(null, Validators.required),
      date: new FormControl(new Date().toISOString().split('T')[0], Validators.required),
      description: new FormControl(''),
    }, {
      validators: this.notEqualValueValidator('from', 'to'),
    });
    this.accountList = await this.accountsService.getAccounts().toPromise();
  }

  private notEqualValueValidator(targetKey: string, toMatchKey: string): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {

      const target = group.controls[targetKey];
      const toMatch = group.controls[toMatchKey];

      if (!target.pristine && !toMatch.pristine) {
        const isMatch = target.value === toMatch.value;
        if (isMatch) {
          target.setErrors({ notEqualValue: targetKey });
          toMatch.setErrors({ notEqualValue: toMatchKey });
          const message = targetKey + ' != ' + toMatchKey;
          return { equalValue: message };
        } else {
          target.setErrors(null);
          toMatch.setErrors(null);
        }

      }

      return null;
    };
  }

  async onSubmit() {
    if (!this.transferForm.valid) {
      return;
    }

    const { from, to, date, ...rest } = this.transferForm.value;
    const payloadToSend = {
      toAccount: to,
      dateTime: new Date(date).toISOString(),
      ...rest,
    };

    const result = await this.accountsService.transferAmount(from, payloadToSend);
    if (result.success) {
      await this.router.navigate(['/accounts']);
    }
  }

}

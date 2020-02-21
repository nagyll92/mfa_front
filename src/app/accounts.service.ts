import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface CustomHttpResponse {
  success: boolean;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private http: HttpClient) {
  }

  public getAccounts() {
    return this.http.get('/api/accounts').pipe(map((response: CustomHttpResponse) => {
      if (response.success) {
        return response.data;
      }
      return null;
    }));
  }

  public getAccount(accountName: string) {
    return this.http.get('api/accounts/' + accountName).pipe(map((response: CustomHttpResponse) => {
      if (response.success) {
        return response.data;
      }
      return null;
    }));
  }

  public updateAccount(accountName: string, account) {
    return this.http.put('api/accounts/' + accountName, account).pipe(map((response: CustomHttpResponse) => {
      return response;
    })).toPromise();
  }

  public createAccount(account) {
    return this.http.post('/api/accounts', account).pipe(map((response: CustomHttpResponse) => {
      return response;
    })).toPromise();
  }

  public removeAccount(accountName: string) {
    return this.http.delete('/api/accounts/' + accountName).pipe(map((response: CustomHttpResponse) => {
      return response.success;
    }));
  }

}

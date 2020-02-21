import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface CustomHttpResponse {
  success: boolean;
  data: any;
}

@Injectable({
  providedIn: 'root'
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
    /*return this.http.get('/api/accounts').toPromise().then(result => {
      console.log('results', result);
      return result;
    }).catch(reason => {
      console.log('reason', reason);
      return reason;
    });*/
  }
}

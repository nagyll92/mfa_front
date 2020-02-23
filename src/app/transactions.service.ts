import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface CustomHttpResponse {
  success: boolean;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private basePath = '/api/transactions';

  constructor(private http: HttpClient) {
  }

  public deleteTransaction(id: number) {
    return this.http.delete(this.basePath + '/' + id).pipe(map((response: CustomHttpResponse) => {
      return response;
    })).toPromise();
  }

  public updateTransaction(id: number, transaction) {
    return this.http.put(this.basePath + '/' + id, transaction).pipe(map((response: CustomHttpResponse) => {
      return response;
    })).toPromise();
  }

  public createTransaction(transaction) {
    return this.http.post(this.basePath, transaction).pipe(map((response: CustomHttpResponse) => {
      return response;
    })).toPromise();
  }

  public getTransaction(id) {
    return this.http.get(this.basePath + '/' + id).pipe(map((response: CustomHttpResponse) => {
      if (response.success) {
        return response.data;
      }
      return null;
    }));
  }

  public getTransactions() {
    return this.http.get(this.basePath).pipe(map((response: CustomHttpResponse) => {
      if (response.success) {
        return response.data;
      }
      return null;
    }));
  }
}

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
export class CategoriesService {
  private basePath = '/api/categories';

  constructor(private http: HttpClient) {
  }

  public getCategories() {
    return this.http.get(this.basePath).pipe(map((response: CustomHttpResponse) => {
      if (response.success) {
        return response.data;
      }
      return null;
    }));
  }
}

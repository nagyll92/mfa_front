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

  public deleteCategory(categoryName: string) {
    return this.http.delete(this.basePath + '/' + categoryName).pipe(map((response: CustomHttpResponse) => {
      return response;
    })).toPromise();
  }

  public createCategory(category) {
    return this.http.post(this.basePath, category).pipe(map((response: CustomHttpResponse) => {
      return response;
    })).toPromise();
  }

  public updateCategory(categoryName: string, category) {
    return this.http.put(this.basePath + '/' + categoryName, category).pipe(map((response: CustomHttpResponse) => {
      return response;
    })).toPromise();
  }

  public getCategories(type: 'INCOME' | 'EXPENSE' = null, parsed: boolean = false) {
    let url = this.basePath;
    if (type !== null) {
      url += '?type=' + type;
    }
    return this.http.get(url).pipe(map((response: CustomHttpResponse) => {
      if (response.success) {
        if (parsed) {
          return this.parseCategories(response.data, null);
        } else {
          return response.data;
        }
      }
      return null;
    }));
  }

  public getCategory(categoryName: string) {
    return this.http.get(this.basePath + '/' + categoryName).pipe(map((response: CustomHttpResponse) => {
      if (response.success) {
        return response.data;
      }
      return null;
    }));
  }

  public parseCategories(inputArray, parent) {
    const output = [];
    for (const item of inputArray) {
      if (item.parent === parent) {
        const children = this.parseCategories(inputArray.filter(cat => cat.name !== item.name), item.name);
        if (children.length) {
          item.children = children;
        }
        output.push(item);
      }
    }
    return output;
  }
}

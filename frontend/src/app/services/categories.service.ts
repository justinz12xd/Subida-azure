import { Injectable, Signal, signal } from '@angular/core';
import { environment } from '@Enviroments/enviroment';
import { inject, } from '@angular/core';
import { AdapterDataService } from './adapter-data.service';
import { Category } from 'app/types';
import { tap } from 'rxjs';
import { categoryAdapter } from '@Adapters/category.adapter';
import { categoriesAdapter } from '@Adapters/categories.adapter ';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private adapterDataService = inject(AdapterDataService)
  url = 'categories/'

  private _categories = signal<Category[]>([]);
  categories$ = this._categories.asReadonly();



  loadCategories() {
    this.adapterDataService.getAdaptedData<Category[]>(this.url, categoriesAdapter)
      .subscribe(categories => {this._categories.set(categories)});
  }


  getCategories(): Signal<Category[]> {
    return this.categories$
  }

  addCategory(data: Category) {
    return this.adapterDataService.postData<Category>(this.url, data, categoryAdapter).pipe(
      tap(() => this.loadCategories())
    )
  }



}

export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDatos() {
    return this.http.get(`${this.baseUrl}/backend`);
  }

  postDatos(data: any) {
    return this.http.post(`${this.baseUrl}/backend`, data);
  }
}

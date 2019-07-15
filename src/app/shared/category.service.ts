import { Injectable } from '@angular/core';
import { Category } from './category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  SelectedCategory: Category={
    _id: '',
    category_id: '',
    category_name: ''
  };
  PassedCategory: Category={
    _id: '',
    category_id: '',
    category_name: ''
  };
  categories: Category[];
  baseUrl = "http://localhost:3200/";

  getCategories() {
    return this.http.get(this.baseUrl + "categories");
  }

  postCategories(newCategory: Category) {
    return this.http.post(this.baseUrl + "categories", newCategory);
  }

  updateCategory(ctgry: Category) {
    return this.http.put(this.baseUrl + "categories/" + ctgry._id, ctgry);
  }

  deleteCategory(ctgry_id: Category["_id"]) {
    return this.http.delete(this.baseUrl + "categories/" + ctgry_id);
  }

  constructor(private http: HttpClient) { 

  }
}

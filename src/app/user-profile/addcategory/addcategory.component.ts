import { Component, OnInit } from '@angular/core';
import { AduserService } from 'src/app/shared/aduser.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/shared/category.service';
import { Category } from 'src/app/shared/category.model';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  private sub: Category={
    _id: '',
    category_id: '',
    category_name: ''
  };
  constructor(private aduserService: AduserService, private router : Router, private categoryService: CategoryService) { }

  ngOnInit() {
    if(this.aduserService.isLoggedIn())
      this.router.navigateByUrl('/userprofile/addcategory');
    
    if(!(this.categoryService.PassedCategory._id === '')) {
      this.categoryService.SelectedCategory = this.categoryService.PassedCategory;
      this.categoryService.PassedCategory = {
        _id: '',
        category_id: '',
        category_name: ''
      };
    }
  }
  
  getcategories() {
    this.categoryService.getCategories().subscribe(
      res=>{
        this.categoryService.categories = res as Category[];
      },
      err=>{

      }
    );
  }

  postcategories(form: NgForm) {
    if(form.value._id === '') {
      this.categoryService.postCategories(form.value).subscribe(
        res=>{
          this.getcategories();
          alert('Category added Successfully');
        },
        err=>{

        }
      );
    }
    else {
      this.categoryService.updateCategory(form.value).subscribe(
        res=>{
          this.getcategories();
          alert('Category Updated Successfully');
        }
      );
    }
    this.router.navigateByUrl('userprofile/viewcategory');
  }

  update(ctgry: Category) {
    this.categoryService.SelectedCategory = ctgry;
  }

  resetForm(form: NgForm) {
    this.categoryService.SelectedCategory = {
      _id: '',
      category_id: '',
      category_name: ''
    };
    form.resetForm();
  }
}

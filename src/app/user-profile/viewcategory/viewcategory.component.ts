import { Component, OnInit } from '@angular/core';
import { AduserService } from 'src/app/shared/aduser.service';
import { Router, NavigationExtras } from '@angular/router';
import { CategoryService } from 'src/app/shared/category.service';
import { Category } from 'src/app/shared/category.model';

@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrls: ['./viewcategory.component.css']
})
export class ViewcategoryComponent implements OnInit {
  constructor(private aduserService: AduserService, private router : Router, public categoryService: CategoryService) { }
  
  ngOnInit() {
    if(this.aduserService.isLoggedIn())
      this.router.navigateByUrl('/userprofile/viewcategory');
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

  delete(ctgry: Category["_id"]) {
    this.categoryService.deleteCategory(ctgry).subscribe(
      res=>{
        this.categoryService.deleteCategory(ctgry);
        this.getcategories();
      }
    );
  }

  navigate(cg: Category) {
    this.categoryService.PassedCategory = cg;
    this.router.navigateByUrl('/userprofile/addcategory');
  }
}

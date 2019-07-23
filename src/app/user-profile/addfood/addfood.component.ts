import { Component, OnInit } from '@angular/core';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { NgForm } from '@angular/forms';
import { AduserService } from 'src/app/shared/aduser.service';
import { Router } from '@angular/router';
import { FoodService } from 'src/app/shared/food.service';
import { Food } from 'src/app/shared/food.model';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from 'src/app/shared/category.service';
import { Category } from 'src/app/shared/category.model';
const URL = 'http://localhost:3200/pics';

@Component({
  selector: 'app-addfood',
  templateUrl: './addfood.component.html',
  styleUrls: ['./addfood.component.css']
})
export class AddfoodComponent implements OnInit {
  private sub: Food={
    _id: '',
    fname: '',
    fprice: null,
    category_id: '',
    fdesc: '',
    fpic: ''
  };
  public selectedFood = new Food();
  selectedfile: File = null;
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  constructor(private aduserService: AduserService, private router : Router, private foodService: FoodService, private categoryService: CategoryService, private http: HttpClient) { }

  ngOnInit() {
    if(this.aduserService.isLoggedIn())
      this.router.navigateByUrl('/userprofile/addfood');
    this.getcategories();
    if(!(this.foodService.PassedFood._id === '')) {
      this.foodService.SelectedFood = this.foodService.PassedFood;
      this.foodService.PassedFood = {
        _id: '',
        fname: '',
        fprice: null,
        category_id: '',
        fdesc: '',
        fpic: ''
      };
    }
  }
  
  onfileselect(event) {
    this.selectedfile = <File>event.target.files[0];
   // console.log(this.selectedfile);
  }

  getfoods() {
    this.foodService.getFoods().subscribe(
      res=>{
        this.foodService.foods = res as Food[];
      },
      err=>{

      }
    );
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

  postfoods(form: NgForm) {
    if(form.value._id === '') {
      form.value.fpic = this.selectedfile.name;
      this.selectedFood.fpic = form.value.fpic;
      const fd = new FormData();
      fd.append('image', this.selectedfile, this.selectedfile.name);
      this.http.post('http://localhost:3200/pics', fd).subscribe(
        res => {
        }
      );
      this.foodService.postFoods(form.value).subscribe(
        res=>{
          this.getfoods();
          alert('Food Saved Successfully');
        },
        err=>{

        }
      );
    }
    else {
      form.value.fpic = this.selectedfile.name;
      this.selectedFood.fpic = form.value.fpic;
      const fd = new FormData();
      fd.append('image', this.selectedfile, this.selectedfile.name);
      this.http.post('http://localhost:3200/pics', fd).subscribe(
        res => {
        }
      );
      this.foodService.updateFood(form.value).subscribe(
        res=>{
          this.getfoods();
          alert('Food Updated Successfully');
        }
      );
    }
    this.router.navigateByUrl('userprofile/viewfood');
  }

  update(fd: Food) {
    this.foodService.SelectedFood = fd;
  }

  resetForm(form: NgForm) {
    this.foodService.SelectedFood = {
      _id: '',
      category_id: '',
      fname: '',
      fprice: null,
      fdesc: '',
      fpic: ''
    };
    form.resetForm();
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AduserService } from 'src/app/shared/aduser.service';
import { Router } from '@angular/router';
import { FoodService } from 'src/app/shared/food.service';
import { Food } from 'src/app/shared/food.model';

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
  constructor(private aduserService: AduserService, private router : Router, private foodService: FoodService) { }

  ngOnInit() {
    if(this.aduserService.isLoggedIn())
      this.router.navigateByUrl('/addfood');
    
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
  
  getfoods() {
    this.foodService.getFoods().subscribe(
      res=>{
        this.foodService.foods = res as Food[];
      },
      err=>{

      }
    );
  }

  postfoods(form: NgForm) {
    if(form.value._id === '') {
      this.foodService.postFoods(form.value).subscribe(
        res=>{
          this.getfoods();
        },
        err=>{

        }
      );
    }
    else {
      this.foodService.updateFood(form.value).subscribe(
        res=>{
          this.getfoods();
        }
      );
    }
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

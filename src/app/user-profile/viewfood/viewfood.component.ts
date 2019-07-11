import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/shared/food.model';
import { AduserService } from 'src/app/shared/aduser.service';
import { Router } from '@angular/router';
import { FoodService } from 'src/app/shared/food.service';

@Component({
  selector: 'app-viewfood',
  templateUrl: './viewfood.component.html',
  styleUrls: ['./viewfood.component.css']
})
export class ViewfoodComponent implements OnInit {

  constructor(private aduserService: AduserService, private router : Router, private foodService: FoodService) { }
  
  ngOnInit() {
    if(this.aduserService.isLoggedIn())
      this.router.navigateByUrl('/viewfood');
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

  delete(fd: Food["_id"]) {
    this.foodService.deleteFood(fd).subscribe(
      res=>{
        this.foodService.deleteFood(fd);
        this.getfoods();
      }
    );
  }

  navigate(fd: Food) {
    this.foodService.PassedFood = fd;
    this.router.navigateByUrl('/userprofile/addfood');
  }

}

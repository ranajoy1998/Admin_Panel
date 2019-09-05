import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/shared/food.model';
import { AduserService } from 'src/app/shared/aduser.service';
import { Router } from '@angular/router';
import { FoodService } from 'src/app/shared/food.service';
import { Category } from 'src/app/shared/category.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-viewfood',
  templateUrl: './viewfood.component.html',
  styleUrls: ['./viewfood.component.css']
})
export class ViewfoodComponent implements OnInit {
  public apiurl = 'https://foozards-server.herokuapp.com';
  trustedUrl;

  constructor(private aduserService: AduserService, private router : Router, private foodService: FoodService, private sanitizer: DomSanitizer) {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.apiurl);
  }
  
  ngOnInit() {
    if(this.aduserService.isLoggedIn())
      this.router.navigateByUrl('/userprofile/viewfood');
    
    this.getcatname();
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

  getcatname() {
    this.foodService.getCategories().subscribe(
      res=>{
        this.foodService.cats = res as Category[];
        //console.log(this.foodService.cats);
      },
      err=>{
        
      }
    );
  }

  getSafeUrl(fpic) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.apiurl + '/' + fpic);
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

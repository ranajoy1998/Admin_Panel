import { Component, OnInit } from '@angular/core';
import { AduserService } from 'src/app/shared/aduser.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css']
})
export class ViewusersComponent implements OnInit {

  constructor(private aduserService: AduserService, private router : Router, private userService: UserService) { }
  
  ngOnInit() {
    if(this.aduserService.isLoggedIn())
      this.router.navigateByUrl('/userprofile/viewusers');
  }
  getusers() {
    this.userService.getUsers().subscribe(
      res=>{
        this.userService.users = res as User[];
      },
      err=>{

      }
    );
  }

}

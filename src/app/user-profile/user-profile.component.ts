import { Component, OnInit } from '@angular/core';
import { AduserService } from '../shared/aduser.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  aduserDetails: any;
  constructor(private aduserService: AduserService, private router: Router) { }

  ngOnInit() {
    this.aduserService.getUserProfile().subscribe(
      res => {
        this.aduserDetails = res['aduser'];
      },
      err => { 
        console.log(err);
        
      }
    );
  }

  onLogout(){
    this.aduserService.deleteToken();
    this.router.navigate(['/login']);
  }

}

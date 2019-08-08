import { Component, OnInit } from '@angular/core';
import { AduserService } from 'src/app/shared/aduser.service';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/shared/booking.service';
import { Booking } from 'src/app/shared/booking.model';

@Component({
  selector: 'app-viewbookings',
  templateUrl: './viewbookings.component.html',
  styleUrls: ['./viewbookings.component.css']
})
export class ViewbookingsComponent implements OnInit {

  constructor(private aduserService: AduserService, private router : Router, private bookingService: BookingService) { }
  
  ngOnInit() {
    if(this.aduserService.isLoggedIn())
      this.router.navigateByUrl('/userprofile/viewbookings');
  }
  getbookings() {
    this.bookingService.getBookings().subscribe(
      res=>{
        this.bookingService.bookings = res as Booking[];
      },
      err=>{

      }
    );
  }
}

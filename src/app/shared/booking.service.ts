import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  SelectedBooking: Booking={
    _id: '',
    fname: '',
    fdesc: '',
    cname: '',
    cemail: '',
    cphone: '',
    caddress: '',
    quantity: '',
    price: '',
    date: null
  };
  
  bookings: Booking[];
  baseUrl = "http://localhost:3004/";

  getBookings() {
    return this.http.get(this.baseUrl + "orders");
  }

  postBookings(newBooking: Booking) {
    return this.http.post(this.baseUrl + "orders", newBooking);
  }

  updateBooking(bks: Booking) {
    return this.http.put(this.baseUrl + "orders/" + bks._id, bks);
  }

  deleteBooking(bks_id: Booking["_id"]) {
    return this.http.delete(this.baseUrl + "orders/" + bks_id);
  }

  constructor(private http: HttpClient) { 

  }
}

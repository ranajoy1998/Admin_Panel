import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  SelectedUser: User={
    _id: '',
    cname: '',
    cemail: '',
    cphone: '',
    caddress: ''
  };
  
  users: User[];
  baseUrl = "https://foozards-server.herokuapp.com/api/";

  getUsers() {
    return this.http.get(this.baseUrl + "users");
  }

  constructor(private http: HttpClient) { 

  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private managerName = '';
  private id = '';
  private address = '';
  private userName = '';

  createUser(email: string, password: string, firstName: string, lastName: string, authCode: string, address: string) {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      authCode: authCode,
      address: address
    };
    this.http.post<{message: string, id: string, managerName: string}>('http://localhost:3000/api/signup', user)
      .subscribe(response => {
        this.router.navigate([`timesheet/${response.id}`]);
        this.managerName = response.managerName;
      });
  }

  loginUser(email: string, password: string) {
    const user = {
      email: email,
      password: password
    };
    this.http.post<{message: string, id: string, managerName: string, address: string, userName: string}>('http://localhost:3000/api/login', user)
      .subscribe(response => {
        this.router.navigate([`timesheet/${response.id}`]);
        this.managerName = response.managerName;
        this.id = response.id;
        this.address = response.address;
        this.userName = response.userName;
      });

  }
  getManager() {
    return this.managerName;
  }

  getAddress(){
    return this.address;
  }

  getUserName(){
    return this.userName;
  }

  getId(){
    return this.id;
  }
  constructor(private http: HttpClient, public router: Router) { }
}

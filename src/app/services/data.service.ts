import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options = {
  withCredentials: true
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  accountDetails = {
    1001: { name: "user1", accno: 1001, pin: 1234, password: "userone", balance: 3000, transactions: [] },
    1002: { name: "user2", accno: 1002, pin: 1244, password: "usertwo", balance: 2900, transactions: [] },
    1003: { name: "user3", accno: 1003, pin: 1254, password: "userthr", balance: 3000, transactions: [] },
    1004: { name: "user3", accno: 1004, pin: 1255, password: "userfour", balance: 5000, transactions: [] },
    1005: { name: "user3", accno: 1005, pin: 1257, password: "userfive", balance: 3100, transactions: [] },

  }
  currentUser;
  msg;
  msgw;
  
  constructor(private http:HttpClient) {
    this.getDetails();
  }
  
  saveDetails() {
    localStorage.setItem("accountDetails", JSON.stringify(this.accountDetails));
    if (this.currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
    }
  }

  getDetails() {
    if (localStorage.getItem("accountDetails")) {
      this.accountDetails = JSON.parse(localStorage.getItem("accountDetails"));
    }
    if (localStorage.getItem("currentUser")) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }

  }
  
  getTransactions() {
    return this.http.get("http://localhost:3000/getTransactions", options);
  }
  deleteTransaction(id) {
    return this.http.delete("http://localhost:3000/getTransactions/"+id , options);
  }
  register(name, accno, pin, password, balance) {
    const data = {
      name, accno, pin, password, balance: 0, transactions: [{ tamount: 0, type: "" }]
    }
    return this.http.post("http://localhost:3000/register", data);
    
  }
  login(accno1, password) {
    var accnum = parseInt(accno1);
    const data = {
      accno: accnum, password
    }
    return this.http.post("http://localhost:3000/login", data, options);
    
  }
  deposit(accno, pin, balance) {
    // var data = this.accountDetails;
    // var amount = parseInt(balance);
    // var pin1 = parseInt(pin)
    // var account_num = parseInt(accno);
    const data = {
      accno, pin, amount: balance
    }
   
    return this.http.post("http://localhost:3000/deposit", data, options);

  }
  err_msg;
  withdrawal(accno, pin, balance) {
  const data = {
    accno, pin, amount: balance
  }
 
  return this.http.post("http://localhost:3000/withdrawal", data, options);
  }
}
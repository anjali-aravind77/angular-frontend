import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.accountDetails[this.currentUser.accno].transactions;
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
    return this.http.post("http://localhost:3000/login", data);
    
  }
  deposit(accno, pin, balance) {
    this.msg = "";
    // var data = this.accountDetails;
    var amount = parseInt(balance);
    var account_num = parseInt(accno);
    const data = {
      accno: account_num, pin, balance: amount
    }
    // if (account_num in data) {
    //   var user_pin = data[account_num].pin;
    //   if (user_pin == pin) {
    //     data[account_num].balance += amount;
    //     this.msg = "Amount of Rs." + amount + " is credited to your account. Available balance is " + data[account_num].balance + ".";
    //     // alert(data[account_num].balance);

    //     data[account_num].transactions.push({
    //       tamount: amount,
    //       type: "deposit"
    //     })
    //     this.saveDetails();
    //     return true;
    //   }
    //   else {
    //     alert("incorrect pin");

    //   }
    // }
    return this.http.post("http://localhost:3000/deposit", data);

  }
  err_msg;
  withdrawal(accno, pin, balance) {
    this.msg = "";
    var data = this.accountDetails;
    var amount = parseInt(balance);
    var account_num = parseInt(accno);
    if (account_num in data) {
      var user_pin = data[account_num].pin;
      if (user_pin == pin) {
        this.err_msg = "";
        if (amount < data[account_num].balance) {
          data[account_num].balance -= amount;
          this.msgw = "Amount of Rs." + amount + " is debited from your account. Available balance is " + data[account_num].balance + ".";
          //   alert(data[account_num].balance);

          data[account_num].transactions.push({
            tamount: amount,
            type: "withdrawal"
          })
          this.saveDetails();
          return {
            status: true,
            message: "amount debited",
            bal: data[account_num].balance
          }
        }
        else {
          this.err_msg = "You have insufficient balance."
        }
      }
      else {
        alert("incorrect pin");

      }
    }
    else {
      return {
        status: false,
        message: "Invalid account"
      }
    }


  }
}
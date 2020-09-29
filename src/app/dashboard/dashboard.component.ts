import { Component, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 name="";
 msg="";
  constructor(public dataservice:DataService, private fb:FormBuilder) { 
    this.name = localStorage.getItem("name")
  }

  ngOnInit(): void {
  }
  depositForm = this.fb.group({
    ac_num:['',[Validators.required]],
    pin_num:['',[Validators.required]],
    amount1:['',[Validators.required]]

  });
  withdrawForm = this.fb.group({
    ac_numw:['',[Validators.required]],
    pin_numw:['',[Validators.required]],
    amount1w:['',[Validators.required]]
  });
  getError(field){
    return this.depositForm.get(field).errors && (this.depositForm.get(field).dirty || this.depositForm.get(field).touched);
  }
  getErrorw(field){
    return this.withdrawForm.get(field).errors && (this.withdrawForm.get(field).dirty || this.withdrawForm.get(field).touched);
  }
 
  deposit(){
   this.dataservice.deposit(this.depositForm.value.ac_num,
       this.depositForm.value.pin_num,
      this.depositForm.value.amount1)
      .subscribe((data:any) => {
        if(data) {
        alert(data.message);
        }
      }, data => {
        alert(data.error.message);
      })

  } 

withdrawal(){

this.dataservice.withdrawal(this.withdrawForm.value.ac_numw, this.withdrawForm.value.pin_numw, 
  this.withdrawForm.value.amount1w)
  .subscribe((data:any) => {
    if(data) {
      alert(data.message);
    }
  }, data => {
    alert(data.error.message);
  })
  
}

}


import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { DataService } from "../services/data.service";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 

// acnom="";
// pwds="";
constructor(private router:Router, public dataservice:DataService, private fb:FormBuilder) { }


  loginForm = this.fb.group({
    acnom :['',[Validators.required]],
    pwds :['',[Validators.required]]
  });
  getError(field){
    return (this.loginForm.get(field).errors)&& (this.loginForm.get(field).dirty || this.loginForm.get(field).touched);
  }
// acnoChange(event){
//   // alert("acchange");
//   this.acnom=event.target.value;
// }
// pwdChange(event){
//   // alert("acchange");
//   this.pwds=event.target.value;
// }

ngOnInit(): void {
}
login(){
if(this.loginForm.valid){
this.dataservice.login(this.loginForm.value.acnom, 
  this.loginForm.value.pwds)
  .subscribe((data:any) => {
    if(data) {
      // alert(data.name);
      localStorage.setItem("name", data.name)
      this.router.navigateByUrl("user_dashboard");
    }
  },(data) => {
    alert(data.error.message);
  })
}
}
}



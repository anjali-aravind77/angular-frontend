import { Component, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private dataService:DataService, private router:Router, 
    private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  registerForm = this.fb.group({
    name:['' ,[Validators.required]],
    accno:['',[Validators.required, Validators.minLength(4)]],
    pwd:['',[Validators.required]],
    pin:['',[Validators.required]]
  });
  getError(er_field){
    return (this.registerForm.get(er_field).touched || this.registerForm.get(er_field).dirty)&& this.registerForm.get(er_field).errors;
  }
  register(){
    if(this.registerForm.valid){
      this.dataService.register(this.registerForm.value.name,
        this.registerForm.value.accno,
        this.registerForm.value.pin,
        this.registerForm.value.pwd,0)
      
    .subscribe((data:any) => {
      if(data) {
        alert("succesfully created account. please login");
         this.router.navigateByUrl("");
      }
     } ,(data) => {
        alert(data.error.message);
      
    })
    } else {
    alert("form is invalid");
    }
   
    
    }
    
  }
 

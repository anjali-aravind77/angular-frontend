import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-trans-history',
  templateUrl: './trans-history.component.html',
  styleUrls: ['./trans-history.component.css']
})
export class TransHistoryComponent implements OnInit {
  transactions: [];
  name;
  constructor(public dataservice: DataService) {
    this.name = localStorage.getItem("name");
    this.getTransactions();
  }
  getTransactions() {  
   
    this.dataservice.getTransactions()
    .subscribe((data:any) => {
      this.transactions = data.transactions;
    })
  }
  ngOnInit(): void {
  }
  delete(transaction) {
   this.dataservice.deleteTransaction(transaction._id)
   .subscribe((data:any) => {
      alert(data.message);
      this.getTransactions();
   })
 }

}

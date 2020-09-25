import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-trans-history',
  templateUrl: './trans-history.component.html',
  styleUrls: ['./trans-history.component.css']
})
export class TransHistoryComponent implements OnInit {
  transactions: [];
  constructor(public dataservice: DataService) {
    this.transactions = dataservice.getTransactions();
  }

  ngOnInit(): void {
  }


}

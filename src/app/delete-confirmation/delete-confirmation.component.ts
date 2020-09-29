import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {
  @Input() id: string;
  @Output() onDelete = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  delete() {
    this.onDelete.emit(this.id)
  }
  cancel() {
    this.onCancel.emit(this.id);
  }

}

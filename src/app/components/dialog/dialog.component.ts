import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshnessList  = ["Brand New", "Second Hand", "Refurnished"]

  ProductCategory = ["Fruits", "Vegtables", "Electornics"]

  constructor() { }

  ngOnInit(): void {
  }

}

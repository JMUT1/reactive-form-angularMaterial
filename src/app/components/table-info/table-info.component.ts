import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormUser} from "../../shared/form-interface"
import { DialogComponent } from '../dialog/dialog.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-table-info',
  templateUrl: './table-info.component.html',
  styleUrls: ['./table-info.component.css']
})
export class TableInfoComponent implements OnInit {

  constructor(private apiTable: ApiService, private dialog: MatDialog) { }

  displayedColumns: string[] = ["id", 'productName', 'category', 'date', 'freshness', "price", "comment", "action"];
  dataSource!: MatTableDataSource<FormUser[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.apiTable.getProduct()
    .subscribe({
      next: (res)=>{
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
        console.log(res);
      },
      error: (err)=>{
        alert("Error fetching data")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

editProduct(row: FormUser){
 this.dialog.open(DialogComponent,{
  width: "30%",
  data: row
 })
}


}

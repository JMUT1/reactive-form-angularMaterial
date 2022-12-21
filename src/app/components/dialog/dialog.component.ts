import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog"
import { FormUser } from 'src/app/shared/form-interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshnessList  = ["Brand New", "Second Hand", "Refurnished"]
  productCategory = ["Fruits", "Vegtables", "Electornics"]
  productForm !: FormGroup
  actionBtn = 'Save'

  constructor(private formBuilder : FormBuilder, private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: FormUser,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : ["", Validators.required],
      category : ["", Validators.required],
      freshness : ["", Validators.required],
      price : ["", Validators.required],
      comment: ["", Validators.required],
      date: ["", Validators.required]
    })

    // WITH THIS IF THE  MAT DIALOG DATA IS GETTING THE INFO WHEN CLICKING THE EDIT BUTTON, CUZ IS TRIGGERING THE OPEN DIALOG METOD
    if(this.editData){
      this.actionBtn = "Update"
      this.productForm.controls["productName"].setValue(this.editData.productName)
      this.productForm.controls["category"].setValue(this.editData.category)
      this.productForm.controls["freshness"].setValue(this.editData.freshness)
      this.productForm.controls["price"].setValue(this.editData.price)
      this.productForm.controls["comment"].setValue(this.editData.comment)
      this.productForm.controls["date"].setValue(this.editData.date)

    }
  }

addProduct(){
  if(this.productForm.valid){
    this.api.postProduct(this.productForm.value)
    .subscribe({
      next:(res)=>{
        alert("product added succesfully")
        this.productForm.reset();
        this.dialogRef.close("save")
      },
      error:()=>{
        alert("Error while adding the product")
      }
    })
  }
}

}

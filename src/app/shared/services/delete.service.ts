import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../Modals/delete/delete.component';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {


  
  constructor(private dialog:MatDialog) { }

  openConfirmDialog(){
   return this.dialog.open(DeleteComponent,{
      width : '50%',
      
      panelClass:'cconfirm-dialog-container',
      disableClose : true,
      position:{top:"10px"}
    })
    
  }
}

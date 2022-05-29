import { Component, OnInit } from '@angular/core';
import { ParentEntity } from '../../models/ParentEntity';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { PermissiontyperepositoryService } from '../../services/permissiontyperepository.service';
import { ParentEntityTransactionMsg } from '../../models/ParentEntityTransactionMsg';

@Component({
  selector: 'app-permission-type-operation',
  templateUrl: './permission-type-operation.component.html',
  styleUrls: ['./permission-type-operation.component.scss']
})
export class PermissionTypeOperationComponent implements OnInit {
  CurrentPermissionTypeData:ParentEntity={
    id:0,
    name:'',
    creator:0,
    teamid:0
  };
  PermissionTypeForm;
  IsUpdate=0;
  ISDelete=0;
  ModalTitle;
  ModalButton;
  constructor(
  config: NgbModalConfig,
  private modalService: NgbModal,
  private fb: FormBuilder,
  private permissiontyperepository:PermissiontyperepositoryService
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
    var obg = localStorage.getItem("CurrentPermissionTypeData")
    localStorage.removeItem("CurrentPermissionTypeData");
    if (obg) {
      this.CurrentPermissionTypeData = JSON.parse(obg);
      console.log(this.CurrentPermissionTypeData);
    }
    this.PermissionTypeForm = this.fb.group({
      id: [this.CurrentPermissionTypeData.id,],
      name: [this.CurrentPermissionTypeData.name, [Validators.required]]
    }) 
  }

  ngOnInit() {
  }

  close(){
    this.modalService.dismissAll();
  }
  Save(){
   if(this.IsUpdate == 0)
   {
      // Create
      this.permissiontyperepository.Post(this.PermissionTypeForm.value).subscribe(
        (d)=>{
          let model:ParentEntityTransactionMsg={
            key:1,
            ParentEntity:d
          }
          this.permissiontyperepository.addpermissiontype(model);
        }
        ,
      error=>{
        console.log(error);
        alert('Network error');
      }
      );
   }
   else
   {
    // update
    this.permissiontyperepository.Put(this.PermissionTypeForm.value).subscribe(
      d=>{
        let model: ParentEntityTransactionMsg ={
          key:2,
          ParentEntity:d
        }
        this.permissiontyperepository.addpermissiontype(model);
      }
      ,
      error=>{
        console.log(error);
        alert('Network error');
      }
    );
   }
  this.close();
  }

  Delete()
  {
    this.permissiontyperepository.Delete(this.CurrentPermissionTypeData.id).subscribe(
      d=>{
            debugger;
            let model: ParentEntityTransactionMsg ={
              key:3,
              ParentEntity:d
            }
           this.permissiontyperepository.addpermissiontype(model);
        }
        ,
      error=>{
        console.log(error);
        alert('Network error');
      }
    );
    this.close();
  }

}

import { Component, OnInit } from '@angular/core';
import { ParentEntity } from 'src/app/shared/models/ParentEntity';
import { PermissiontyperepositoryService } from 'src/app/shared/services/permissiontyperepository.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PermissionTypeOperationComponent } from 'src/app/shared/Modals/permission-type-operation/permission-type-operation.component';
import { GlobalsettingsService } from 'src/app/shared/services/globalsettings.service';

@Component({
  selector: 'app-permission-types',
  templateUrl: './permission-types.component.html',
  styleUrls: ['./permission-types.component.scss']
})
export class PermissionTypesComponent implements OnInit {

PermissionTypes:ParentEntity[];
loader=false;
page=1;
pageSize=10;
  constructor(
    private permissiontyperepository: PermissiontyperepositoryService,
    private modalService: NgbModal,
    private settings:GlobalsettingsService
  ) {
    this.settings.IsAuthenticatd();
   }

 
  ngOnInit() {
    this.GetAllPermissionTypes();
    this.permissiontyperepository.getpermissiontype().subscribe(a=>{ 
      if(a.key==1)
      {
         // add
         this.PermissionTypes.push(a.ParentEntity);
      }


      if(a.key==2)
      {
         // edit
         let index = this.PermissionTypes.findIndex(x => x.id ===a.ParentEntity.id);
         this.PermissionTypes[index]=a.ParentEntity;
      }

      if(a.key==3)
      {
         // delete
         let index = this.PermissionTypes.findIndex(x => x.id ===a.ParentEntity.id);
         this.PermissionTypes.splice(index,1);
      
      }

    });
}
GetAllPermissionTypes()
{
  this.permissiontyperepository.GetAll().subscribe(
    d=> {
      this.PermissionTypes=d;
    }
  );
}
openmodal() {
  const ref =  this.modalService.open(PermissionTypeOperationComponent, { size: 'lg' });
  ref.componentInstance.ModalTitle='Add New Permission Type..';
  ref.componentInstance.ModalButton='Add';
  ref.componentInstance.ISDelete = 0;
  ref.componentInstance.IsUpdate = 0;
}
 edit(permissiontype){
   localStorage.setItem("CurrentPermissionTypeData",JSON.stringify(permissiontype));
   const ref = this.modalService.open(PermissionTypeOperationComponent, { size: 'lg' });
   ref.componentInstance.ModalTitle='Updating Permission Type..';
   ref.componentInstance.ModalButton='Update';
   ref.componentInstance.ISDelete = 0;
   ref.componentInstance.IsUpdate = 1;
 }

 delete(permissiontype:ParentEntity)
 {
  localStorage.setItem("CurrentPermissionTypeData",JSON.stringify(permissiontype));
   const ref = this.modalService.open(PermissionTypeOperationComponent, { size: 'lg' });
   ref.componentInstance.ModalTitle='Confirm Deleting..';
   ref.componentInstance.ModalButton='Delete';
   ref.componentInstance.ISDelete = 1;
   ref.componentInstance.IsUpdate = 0;
}


}

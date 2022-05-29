import { Component, OnInit } from '@angular/core';
import { Permissionmodel } from '../../models/permissionmodel';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { Permissiontypemodel } from '../../models/permissiontypemodel';
import { PermissiontyperepositoryService } from '../../services/permissiontyperepository.service';
import { PermissionrepositoryService } from '../../services/permissionrepository.service';
import { PermissionTransacionMsg } from '../../models/PermissionTransacionMsg';
import { ImageModel } from '../../models/ImageModel';
import { ImagerepositoryService } from '../../services/imagerepository.service';
import { GlobalsettingsService } from '../../services/globalsettings.service';
import { ImageTransacionMsg } from '../../models/ImageTransacionMsg';
import * as moment from 'moment';
import { DeleteService } from '../../services/delete.service';


import * as $ from "jquery";
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-permissionoperation',
  templateUrl: './permissionoperation.component.html',
  styleUrls: ['./permissionoperation.component.scss']
})
export class PermissionoperationComponent implements OnInit {
 ISDelete=0;
 IsUpdate=0;
 ModalTitle;
 ModalButton;
 CurrentUrl;
 PermissionForm;
 loadstatus=false;
 PermissionTypes: Permissiontypemodel[];
 CurrentPermissionData: Permissionmodel=
 { "id":0,
   "name": "",
   "creationDate": "",
   "timeFrom": "",
   "timeTo": "",
   "duration": "",
   "details": "",
   "userId": 0,
   "userName": "",
   "permissionTypeId":1,
   "creator":0,
   "teamid":0,
   images:ImageModel[0]
  };
  image:File;
 constructor(
  config: NgbModalConfig,
   private modalService: NgbModal,
   private fb: FormBuilder,
   private permissiontyperepository: PermissiontyperepositoryService,
   private Permissionrepository: PermissionrepositoryService,
   private ImageReopsitory:ImagerepositoryService,
   private settings: GlobalsettingsService,
   private DeleteService: DeleteService,/*private reqser: RequestSerService ,*/
   private notser: NotificationService


   )
   {
  config.backdrop = 'static';
  config.keyboard = false;
  var obg = localStorage.getItem("CurrentPermissionData")
  localStorage.removeItem("CurrentPermissionData");
  if (obg) {

    this.CurrentPermissionData = JSON.parse(obg);
  }
  this.PermissionForm = this.fb.group({
    id: [this.CurrentPermissionData.id,],
    timeFrom: [this.CurrentPermissionData.timeFrom, [Validators.required]],
    timeTo: [this.CurrentPermissionData.timeTo, [Validators.required] ],
    details: [this.CurrentPermissionData.details,],
    permissionTypeId: [this.CurrentPermissionData.permissionTypeId,[Validators.required]],
  })

  let stringurl =settings.Url();
  this.CurrentUrl=stringurl.substring(0,stringurl.length - 4);
}
close(){
  this.modalService.dismissAll();
}

onFileChanged(event) {
  let file = event.target.files[0];
  $('#upload').hide();
  
  let filename = file.name;
  var file_name_array = filename.split(".");
  var ext = file_name_array[file_name_array.length - 1];
  if( ext =="jpg"|| ext =="jpeg" || ext == "JPEG" || ext =="JPG" || ext == "PNG" || ext =="png"|| ext =="pdf" || ext =="docx" || ext =="doc" )
  {
    if(this.PermissionForm.valid){
      $('#submit').removeAttr('disabled');
    }

    this.image = file;

  //   let uploadData = new FormData();
  // uploadData.append("Image",this.image);
  // uploadData.append('userId',this.CurrentPermissionData.id.toString());
  // uploadData.append('AttachmentTypeId','3');
  // this.ImageReopsitory.UploadImage(uploadData).subscribe(
  //   (d:any)=>{
  //     debugger;
  //     if(d.status==true){
  //       this.loadstatus=true;
  //       this.CurrentPermissionData.images.push(d.data);
  //       let model:ImageTransacionMsg ={
  //         key:1,
  //         image:d.data
  //       }
  //       this.ImageReopsitory.addimg(model);
  //     }
  //   },
  //   error=>{
  //     console.log(error);
  //     alert('error');
  //   }
  // );
  }
  // else if( (ext =="jpg"|| ext =="jpeg" || ext == "JPEG" || ext =="JPG" || ext == "PNG" || ext =="png" || ext =="pdf" || ext =="docx" || ext =="doc") && this.PermissionForm.value.permissionTypeId == 3 )
  // {
  //   if(this.PermissionForm.valid){
  //     $('#submit').removeAttr('disabled');
  //   }
  //   this.image = file;

  // //   let uploadData = new FormData();
  // // uploadData.append("Image",this.image);
  // // uploadData.append('userId',this.CurrentPermissionData.id.toString());
  // // uploadData.append('AttachmentTypeId','3');
  // // this.ImageReopsitory.UploadImage(uploadData).subscribe(
  // //   (d:any)=>{
  // //     debugger;
  // //     if(d.status==true){
  // //       this.loadstatus=true;
  // //       this.CurrentPermissionData.images.push(d.data);
  // //       let model:ImageTransacionMsg ={
  // //         key:1,
  // //         image:d.data
  // //       }
  // //       this.ImageReopsitory.addimg(model);
  // //     }
  // //   },
  // //   error=>{
  // //     console.log(error);
  // //     alert('error');
  // //   }
  // // );
  // }
  else{
    this.notser.Warning("Invalid Image");
    $('#submit').attr('disabled','disabled');
    event.target.files[0].set(null);
  }
}

Upload(id:number)
{
  if (this.image)
  {
      let uploadData = new FormData();
      uploadData.append("Image",this.image);
      uploadData.append('ParentId',id.toString());
      uploadData.append('AttachmentTypeId','3');
      this.ImageReopsitory.UploadImage(uploadData).subscribe(
      (d:any)=>{
          if(d.status != true){
            console.log(d.error);
            this.notser.Warning("Error in Uploading Image..");
          }
      else{

        let model:ImageTransacionMsg ={
          key:1,
          image:d.data
        }
        this.ImageReopsitory.addimg(model);
      }

        },
        error=>{
          console.log(error);
          this.notser.Warning('error');
        }
      );
  }
}

RemoveImg(img)
{

 if(confirm("Confirm Deleting This Image?"))
  {
    this.ImageReopsitory.RemoveImage(img.imageId).subscribe(
      (d:any)=>{
        if(d.status==true){

         this.loadstatus=true;
          this.CurrentPermissionData.images = this.CurrentPermissionData.images.filter(function(newimg)
          {
              if( newimg.imageId != img.imageId)
              {
                return newimg;
              }
          });

          let model:ImageTransacionMsg ={
            key:3,
            image:d.data
          }
          this.ImageReopsitory.addimg(model);
        }
      },
      error=>{
        console.log(error);
        this.notser.Warning("Network error");
      }
    );
  }

  else{
       return false;
  }
}


Save(){
this.PermissionForm.value.userId = this.CurrentPermissionData.userId;
if (this.PermissionForm.value.permissionTypeId == 3 && !this.image && this.CurrentPermissionData.images.length == 0) {
  $('#upload').show();
return;
}
let fromDate =  moment(this.PermissionForm.value.timeFrom).format("yyyy-MM-DD");
let toDate = moment(this.PermissionForm.value.timeTo).format("yyyy-MM-DD");
// Ausing the fromDate and toDate are numbers. In not convert them first after null check
if ((fromDate !== null && toDate !== null) && fromDate > toDate) {
  $('#dateRange').show();
    return;
}

 if(this.IsUpdate == 0)
 {

    // Create
    this.Permissionrepository.Post(this.PermissionForm.value).subscribe(
      (data:any)=>{
        if(data.status == true){
          this.notser.success("Inserted Successfully");
            this.Upload(data.data.id)
            let model:PermissionTransacionMsg ={
              key:1,
              Permissionmodel:data
            }
            this.Permissionrepository.addpermission(model);
            this.close();
        }
        else{
          this.notser.Warning(data.error);
        }
      }
      ,
      error=>{
        this.notser.Warning('Network error');
      }
    );
 }
 else
 {
  // update
  this.Permissionrepository.Put(this.PermissionForm.value).subscribe(
    (data:any)=>{
      if(data.status == true)
      {
        this.notser.success("Updated Successfully");

        this.Upload(data.data.id)
        let model:PermissionTransacionMsg ={
          key:2,
          Permissionmodel:data.data
        }
        this.Permissionrepository.addpermission(model);
        this.close();
      }
      else{
        this.notser.Warning(data.error);
      }
    }
    ,
      error=>{
        this.notser.Warning('Network error');
      }
  );
 }

}
Delete()
{
  this.Permissionrepository.Delete(this.CurrentPermissionData.id).subscribe(
    data=>{
      let model:PermissionTransacionMsg ={
        key:3,
        Permissionmodel:data
      }
      this.Permissionrepository.addpermission(model);
    }
    ,
      error=>{
        console.log(error);
        this.notser.Warning('Network error');
      }
  );
  this.close();
}

ngOnInit() {

  
    this.GetPermissionTypes();
  }

GetPermissionTypes()
  {
    this.permissiontyperepository.GetAll().subscribe(
      (d:Permissiontypemodel[])=>{
        this.PermissionTypes=d;
      }
    );

  }


  Enlarge(event){

    setTimeout(()=>{
      event.srcElement.classList.add("zoom");


    },0)
    setTimeout(()=>{
    event.srcElement.classList.remove("zoom");
  },2000)

  }
  
 onTillDate(){
    let fromDate =  moment(this.PermissionForm.value.timeFrom);
let toDate = moment(this.PermissionForm.value.timeTo);
// Ausing the fromDate and toDate are numbers. In not convert them first after null check

if ((fromDate !== null && toDate !== null) && fromDate > toDate) {
  this.PermissionForm.controls['timeTo'].setErrors({ timeTo: true });
  $('#dateRange').show();
}
else{
  this.PermissionForm.controls['timeTo'].setErrors(null);
  $('#dateRange').hide();
}
  }
  confirmRemoveFile() {
    ($("#confirm-remove-modal") as any).modal("show");
  }
  cancelConfirmRemoveModal() {
    ($("#confirm-remove-modal") as any).modal("hide");
  }
}
import { Component, OnInit,Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usermodel } from '../../models/usermodel';
import { RoleReopsitoryService } from '../../services/role-reopsitory.service';
import { UserrepositoryService } from '../../services/userrepository.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserTransacionMsg } from '../../models/user-transacion-msg';
import { GlobalsettingsService } from '../../services/globalsettings.service';
import { ImagerepositoryService } from '../../services/imagerepository.service';
import { ImageModel } from '../../models/ImageModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-useroperation',
  templateUrl: './useroperation.component.html',
  styleUrls: ['./useroperation.component.scss']
})
export class UseroperationComponent implements OnInit {
 Roles=[];
 userForm;
 Seniors: Usermodel[];
 showsenior=4;
 ModalTitle;
 ModalButton;
 CurrentRoleId;
 CurrentTeamId;
 CurrentUserId;
 CurrentUserData:Usermodel = {"id":0,
                          "name":'',
                          "phoneNumber":'',
                          "companyName":'',
                          "department":'',
                          "userPassword":'',
                          "nationalId":'',
                            "seniorId":-1,
                            "teamId":0,
                            "roleId":4,
                            "employeeNumber":'',
                            "teamName":'',
                            "roleName":'',
                            "creationDate":'',
                            "isDeleted":'',
                            "creator":0,
                            "seniorName":'',
                            "location":'',
                            "joiningDate":'',
                            "images":ImageModel[0],
                            "passwordChanged":false
}
 ISDelete=0;
 IsUpdate=0;
 image:File;
  constructor(
    config: NgbModalConfig,
     private modalService: NgbModal,
     private RoleReopsitory:RoleReopsitoryService,
     private UserReopsitory:UserrepositoryService,
     private ImageRepository:ImagerepositoryService,
     private fb: FormBuilder,
     private settings: GlobalsettingsService
     )
     {
    config.backdrop = 'static';
    config.keyboard = false;
    var obg = localStorage.getItem("CurrentUserData")
    localStorage.removeItem("CurrentUserData");
    if (obg) {
      this.CurrentUserData = JSON.parse(obg);
      console.log(this.CurrentUserData);
    }
    this.showsenior=this.CurrentUserData.roleId;
    this.CurrentTeamId = this.settings.LogingTeam();
    this.CurrentRoleId = this.settings.LogingRole();
    this.CurrentUserId = this.settings.LogingUserId();
    this.userForm = this.fb.group({
      id: [this.CurrentUserData.id,],
      roleId: [this.CurrentUserData.roleId, [Validators.required]],
      seniorId: [this.CurrentUserData.seniorId],
      name: [this.CurrentUserData.name, [Validators.required]],
      phoneNumber: [this.CurrentUserData.phoneNumber,[Validators.required]],
      companyName: [this.CurrentUserData.companyName],
      // ,[Validators.minLength(11),Validators.maxLength(14)]
      employeeNumber: [this.CurrentUserData.employeeNumber,[Validators.required]],
      // ,[Validators.minLength(3),Validators.maxLength(6)]
     // department: [this.CurrentUserData.department],
      location: [this.CurrentUserData.location],
      joiningDate: [this.CurrentUserData.joiningDate],
      imageId: [this.CurrentUserData.imageId,],
      nationalId: [this.CurrentUserData.nationalId]
      // ,[Validators.minLength(14),Validators.maxLength(14)]
    })

this.CurrentRoleId=this.settings.LogingRole();

  }

  GetallRoles()
  {
      this.RoleReopsitory.GetAll().subscribe(
      (data:any) => {

        this.Roles = data;
        // admin
        if (this.CurrentRoleId == 2)
        {

             this.Roles = this.Roles.filter(function(role)
             {
                 if( role.id != 1)
                 {
                   return role;
                 }
             });

        }

          // senior
          if (this.CurrentRoleId == 3)
          {
               this.Roles = this.Roles.filter(function(role)
               {
                if( role.id == 4)
                   {
                     return role;
                   }
               });

          }


      })
  }

  onFileChanged(event) {
    let file = event.target.files[0];
    let filename = file.name;
    var file_name_array = filename.split(".");
    var ext = file_name_array[file_name_array.length - 1];
    if( ext =="jpg"|| ext =="jpeg" || ext == "JPEG" || ext =="JPG" || ext == "PNG" || ext =="png")
    {
      this.image = file;
    }
    else{
      alert("Invalid Image");
    }
  }

GetallSeniors()
{
    this.UserReopsitory.GetUsersByrole(this.CurrentTeamId,3).subscribe(
    (data: any) => {

     if(data.status)
     {
      this.Seniors = data.data;
     }
     else{
       alert(data.error);
     }
    })
}
  ngOnInit() {
    this.GetallRoles();
    this.GetallSeniors();
  }
  close(){
    this.modalService.dismissAll();
  }

Upload(id:number)
{
  if (this.image)
  {
  // let uploadData = new FormData();
  // uploadData.append("Image",this.image);
  // uploadData.append('userId',id.toString());
  // uploadData.append('AttachmentTypeId','2');
  // this.ImageRepository.UploadImage(uploadData).subscribe(
  //  (d:any)=>{
  //     if(d.status != true){
  //       console.log(d.error);
  //       alert("Error in Uploading Image..");
  //     }

  //   },
  //   error=>{
  //     console.log(error);
  //     alert('error');
  //   }
  // );

debugger;

  let uploadData = new FormData();
  uploadData.append("Image",this.image);
  uploadData.append('ParentId',id.toString());
  uploadData.append('AttachmentTypeId','2');
  this.ImageRepository.UploadImage(uploadData).subscribe(
    (d:any)=>{
      if(d.status != true){
        console.log(d.error);
        alert("Error in Uploading Image..");
      }

    },
    error=>{
      console.log(error);
      alert('error');
    }
  );



  }
}

  Save(){

   if(this.IsUpdate == 0)
   {

      // Create
      this.UserReopsitory.PostUser(this.userForm.value).subscribe(
        (d:any)=>{
          debugger
          if(d.status != true)
          {
            console.log(d.error);
           // Swal.fire(
            // d.error
            //)
             alert(d.error);
          }
          else
          {
            // upload image
            debugger;
            console.log(d.data.id);
            this.Upload(d.data.id);
            let model: UserTransacionMsg={
              key:1,
              Usermodel:d.data
            }
            this.UserReopsitory.adduser(model);
            this.close();

          }
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
    if(this.userForm.value.roleId != 4)
    {
      debugger
      this.userForm.value.seniorId=-1;
    }
    else {
      if(this.userForm.value.seniorId==0)
      {
        this.userForm.value.seniorId=1;
      }
    }
    this.UserReopsitory.PutUser(this.userForm.value).subscribe(
      (d:Usermodel)=>{
        debugger
        if(d.status != true)
          {
            console.log(d.error);
           alert(d.error);
          }
          else{
           // this.Upload(d.data.id);
            let model: UserTransacionMsg={
              key:2,
              Usermodel:d.data
            }
            this.UserReopsitory.adduser(model);
            this.close();
          }

      }
      ,
      error=>{
        console.log(error);
        alert('Network error');
      }
    );
   }

  }
  Delete()
  {
    this.UserReopsitory.DeleteUser(this.CurrentUserData.id).subscribe(
      (d:Usermodel)=>{
        let model: UserTransacionMsg={
          key:3,
          Usermodel:d
        }
        this.UserReopsitory.adduser(model);
      },
      error=>{
        console.log(error);
        alert('Network error');
      }
    );
    this.close();
  }

  ShowSenior(userType)
  {
    this.showsenior=userType;
  }
}

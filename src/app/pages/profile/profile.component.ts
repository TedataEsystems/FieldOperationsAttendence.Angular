import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserrepositoryService } from 'src/app/shared/services/userrepository.service';
import { Usermodel } from 'src/app/shared/models/usermodel';
import { Permissionmodel } from 'src/app/shared/models/permissionmodel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PermissionoperationComponent } from 'src/app/shared/Modals/permissionoperation/permissionoperation.component';
import { GlobalsettingsService } from 'src/app/shared/services/globalsettings.service';
import { FormBuilder } from '@angular/forms';
import { GetPermissionModel } from 'src/app/shared/models/GetPermissionModel';
import { PermissionrepositoryService } from 'src/app/shared/services/permissionrepository.service';
import { ImageModel } from 'src/app/shared/models/ImageModel';
import { ImagerepositoryService } from 'src/app/shared/services/imagerepository.service';
import { ReportService } from 'src/app/shared/services/report.service';
import { PermissiontyperepositoryService } from 'src/app/shared/services/permissiontyperepository.service';
import { Permissiontypemodel } from 'src/app/shared/models/permissiontypemodel';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
curentid;
userobg:Usermodel = {"id":0,
"name":'',
"phoneNumber":'',
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
//"imageId":0,
//"imagePath":'',
"joiningDate":'',
"passwordChanged":false,
'images':[]
};
technicians:Usermodel[];
TotalDesc:any=[];
permissions: Permissionmodel[]=[];
page:number=1;
pageSize=10;
loader = false;
CurrentTeamId;
CurrentRoleId;
CurrentUrl;
ObjroleId;
PermissionTypes: Permissiontypemodel[];
GetPermissionForm;
GetPermission:GetPermissionModel;
perm:Permissionmodel={
  id:0,
  name: '',
   creationDate: '',
   timeFrom: '',
   timeTo: '',
   duration: '',
   details: '',
   userId: 0,
   userName: '',
   permissionTypeId: 1,
   creator: 0,
   teamid: 0,
   images:[]
};
image:File;

  constructor(
    private id:ActivatedRoute,
    private UserRepo:UserrepositoryService,
    private modalService: NgbModal,
    private settings: GlobalsettingsService,
    private fb:FormBuilder,
    private permissiontyperepository: PermissiontyperepositoryService,
    private permissionrepository:PermissionrepositoryService,
    private UserReopsitory:UserrepositoryService,
    private ImageReopsitory:ImagerepositoryService,
    private report:ReportService,

  )
  {
    this.settings.IsAuthenticatd();
    this.curentid=this.id.snapshot.params['id'];
    let stringurl =settings.Url();
    this.CurrentUrl=stringurl.substring(0,stringurl.length - 4);
    this.CurrentRoleId=settings.LogingRole();

    this.GetPermissionForm = this.fb.group({
      time_from:[''],
      time_to:[''],
      permissintype_id:0
    });

   }
   ngOnChanges(): void {
   }

  GetUserData()
  {
    this.loader=true;
    this.UserRepo.GetUserData(this.curentid).subscribe(
      (d:any)=>{

        if(d.status==true) {
          this.userobg=d.data.userModel;
          this.permissions = d.data.permissinModels;
          this.ObjroleId=this.userobg.roleId;
          this.loader=false;
        }
        else{
          alert(d.error);
        }

      }
    );
  }

  GetPermissions()
  {
    this.loader = true;
    if( this.GetPermissionForm.value.time_from || this.GetPermissionForm.value.time_to)
    {
        this.GetPermission = this.GetPermissionForm.value;
        this.GetPermission.user_id= Number(this.curentid);
        this.permissionrepository.GetPermissionByTime(this.GetPermission).subscribe((d:any)=>{
        if(d.status == true)
        {
          
          
          this.permissions=d.data.data;                  
          this.TotalDesc =d.data.details; 
          console.log(d.data.details);
          this.loader = false;
        }
        else{
          alert(d.error);
        }
      });
  }
  else{
    this.permissionrepository.GetDefualtPermission(Number(this.curentid)).subscribe(
      (d:any)=>{
      if(d.status == true){
        this.permissions=d.data;
        this.loader = false;
      }
      else{
        alert(d.error);
      }
    }
    );

  }
  }

  GetPermissionTypes()
  {
    this.permissiontyperepository.GetAll().subscribe(
      (d:Permissiontypemodel[])=>{

        this.PermissionTypes=d;
      }
    );

  }

  RemoveImg(img)
  {

   if(confirm("Confirm Deleting This Image?"))
    {
      this.loader=true;
      this.ImageReopsitory.RemoveImage(img.imageId).subscribe(
        (d:any)=>{

          if(d.status==true){
            this.userobg.images = this.userobg.images.filter(function(newimg)
            {
                if( newimg.imageId != img.imageId)
                {
                  return newimg;
                }
            });
            this.loader=false;
          }
        },
        error=>{
          console.log(error);
          alert('error');
        }
      );
    }

    else{
         return false;
    }
  }

  exportTabletoexcel(): void
  {
   const result = this.permissions.map(({ name, timeFrom, timeTo, details,duration }) => ({
    name,
    timeFrom,
    timeTo,
    details,
    duration
  }));
    this.report.exportAsExcelFile(result,this.userobg.name);
  }

    onFileChanged(event) {
      let file = event.target.files[0];
      let filename = file.name;
      var file_name_array = filename.split(".");
      var ext = file_name_array[file_name_array.length - 1];
      console.log(this.GetPermissionForm.value.permissionTypeId);
      if( ext =="jpg"|| ext =="jpeg" || ext == "JPEG" || ext =="JPG" || ext == "PNG" || ext =="png")
      {
        this.loader=true;
        this.image = file;
        let uploadData = new FormData();
      uploadData.append("Image",this.image);
      uploadData.append('ParentId',this.userobg.id.toString());
      uploadData.append('AttachmentTypeId','2');
      this.ImageReopsitory.UploadImage(uploadData).subscribe(
        (d:any)=>{
          if(d.status==true){
            this.userobg.images.push(d.data);
            this.loader=false;
          }
        },
        error=>{
          console.log(error);
          alert('error');
        }
      );
      }
      else{
        alert("Invalid Image");
      }
    }

    ngOnInit() {
      this.GetUserData();
      this.GetPermissionTypes();
      this.permissionrepository.getpermission().subscribe(a=>{
        this.GetPermissions();
        // if(a.key==1)
        // {
        //   // add
        //   this.permissions.push(a.Permissionmodel);
        // }

        // if(a.key==2)
        // {
        //   // edit
        //   let index = this.permissions.findIndex(x => x.id ===a.Permissionmodel.id);
        //   this.permissions[index]=a.Permissionmodel;
        //   console.log(this.permissions);
        // }

        // if(a.key==3)
        // {
        //   // delete
        //   let index = this.permissions.findIndex(x => x.id ===a.Permissionmodel.id);
        //   this.permissions.splice(index,1);

        // }

      });
    }

    openmodal() {
      this.perm.userId=this.userobg.id;
      localStorage.setItem("CurrentPermissionData",JSON.stringify(this.perm));
      const ref =  this.modalService.open(PermissionoperationComponent, { size: 'lg' });
      ref.componentInstance.ModalTitle='Add New Permission..';
      ref.componentInstance.ModalButton='Add';
      ref.componentInstance.ISDelete = 0;
      ref.componentInstance.IsUpdate = 0;
    }
    edit(permission){
      console.log(permission);
      localStorage.setItem("CurrentPermissionData",JSON.stringify(permission));
      const ref = this.modalService.open(PermissionoperationComponent, { size: 'lg' });
      ref.componentInstance.ModalTitle='Updating Permission..';
      ref.componentInstance.ModalButton='Update';
      ref.componentInstance.ISDelete = 0;
      ref.componentInstance.IsUpdate = 1;
    }
    delete(permission)
    {
      localStorage.setItem("CurrentPermissionData",JSON.stringify(permission));
      const ref = this.modalService.open(PermissionoperationComponent, { size: 'lg' });
      ref.componentInstance.ModalTitle='Confirm Deleting..';
      ref.componentInstance.ModalButton='Delete';
      ref.componentInstance.ISDelete = 1;
      ref.componentInstance.IsUpdate = 0;
    }

    Enlarge(event){

      setTimeout(()=>{
        event.srcElement.classList.add("zoom");


      },0)
      setTimeout(()=>{
      event.srcElement.classList.remove("zoom");
    },2000)

    }
  
}

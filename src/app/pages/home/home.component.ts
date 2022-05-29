import { Component, OnInit } from '@angular/core';
import { UserrepositoryService } from 'src/app/shared/services/userrepository.service';
import { Usermodel } from 'src/app/shared/models/usermodel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleReopsitoryService } from 'src/app/shared/services/role-reopsitory.service';
import { UseroperationComponent } from 'src/app/shared/Modals/useroperation/useroperation.component';
import { GlobalsettingsService } from 'src/app/shared/services/globalsettings.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ReportService } from 'src/app/shared/services/report.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchval;
  Users = [];
  customers:any = [];
  Roles=[];
  Seniors:Usermodel[]=[];
  CurrentViewRoleId=0;
  CurrentViewSeniorId=0;
  page:number=1;
  pageSize=20;
  loader = false;
  usermodel:Usermodel;
  CurrentTeamId:number;
  CurrentRoleId :number;
  CurrentUserId :number;
   constructor(
          private UserRepo:UserrepositoryService,
          private modalService: NgbModal,
          private RoleReopsitory:RoleReopsitoryService,
          private settings:GlobalsettingsService,
          private report:ReportService,
      )
      {
        this.settings.IsAuthenticatd();
        this.CurrentUserId = this.settings.LogingUserId();
        this.CurrentTeamId = this.settings.LogingTeam();
        this.CurrentRoleId = this.settings.LogingRole();
        this.getall();
        this.GetallRoles();
        this.GetallSeniors();
      }


    exportAsXLSX():void {
     this.report.exportAsExcelFile(this.Users, 'mydata');
    }

      exportTabletoexcel(): void
      {
        let reportobj = this.Users.map(({name,employeeNumber,department,phoneNumber,location,roleName,joiningDate,creationDate})=>({
          name,employeeNumber,department,phoneNumber,location,roleName,joiningDate,creationDate}));

          this.report.exportAsExcelFile(reportobj,'AllUsers');
        }
   Onsearchchange()
   {
      if(this.searchval)
      {
          let searchval= this.searchval;
          this.loader = true;
              this.UserRepo.Search(searchval).subscribe(
                (data:any) => {

               if(data.status == true){
                this.Users=data.data;
                if(this.CurrentViewSeniorId != 0){
                  this.Users=this.Users.filter(p=>p.seniorId == this.CurrentViewSeniorId);
                }
                if(this.CurrentViewRoleId != 0){
                  this.Users=this.Users.filter(p=>p.roleId == this.CurrentViewRoleId);
                }
                // admin
                 if (this.CurrentRoleId==2)
                 {
                       this.Users = this.Users.filter(function(user:Usermodel)
                       {
                           if( user.roleId != 1)
                           {
                             return user;
                           }
                       });

                 }

                 // senior
                 if (this.CurrentRoleId==3)
                   {
                     this.Users = this.Users.filter(function(user:Usermodel)
                       {
                           if( user.roleId == 4)
                           {
                             return user;
                           }
                       });
                   }
                   this.loader = false;
               }
               else{
                 alert(data.error);
               }
                },
                error => {
                  alert('error');
                }
              );


      }
      else {
        this.getall();
      }
  }
 getall()
 {

   this.loader=true;
   this.UserRepo.GetByTeamId(this.CurrentTeamId).subscribe(
     (data:any) =>{
      
      if (data.status == true)
      {
      
      this.Users=data.data;
      if(this.CurrentViewSeniorId != 0){
        this.Users=this.Users.filter(p=>p.seniorId == this.CurrentViewSeniorId);
      }

      if(this.CurrentViewRoleId != 0){
        this.Users=this.Users.filter(p=>p.roleId == this.CurrentViewRoleId);
      }
        // admin
        if (this.CurrentRoleId==2)
        {
              this.Users = this.Users.filter(function(user:Usermodel)
              {
                  if( user.roleId != 1)
                  {
                    return user;
                  }
              });

        }

        // senior
        if (this.CurrentRoleId==3)
          {
            this.UserRepo.GetUsersByrole(this.CurrentTeamId,4).subscribe(
              (d: any) =>{
                if(d.status){
                  this.Users=d.data.filter(p=>p.seniorId == this.CurrentUserId);
                }
                else{
                  alert(d.error);
                }
              },
              );
          }
          this.loader=false;
        }

        else {
          alert(data.error);
        }
     },
    );

 }


  ngOnInit() {
    this.UserRepo.getUser().subscribe(a=>{
      console.log(a.Usermodel);
      if(a.key==1)
      {
        // add
        this.Users.push(a.Usermodel);
      }

      if(a.key==2)
      {

        // edit
        let index = this.Users.findIndex(x => x.id ===a.Usermodel.id);
        this.Users[index]=a.Usermodel;
      }

      if(a.key==3)
      {
        // delete
        let index = this.Users.findIndex(x => x.id ===a.Usermodel.id);
        this.Users.splice(index,1);
      }

    })

   }

   GetTichniciansBySenior()
   {
    if( this.CurrentViewSeniorId != 0){
      this.loader=true;
      this.UserRepo.GetUsersByrole(this.CurrentTeamId,4).subscribe(
        (data: any) =>{
          if(data.status == true){
            this.Users=data.data.filter(p=>p.seniorId == this.CurrentViewSeniorId);
          }
          else
          {
            alert(data.error);
          }
        },
       );
       this.loader=false;
      }

      else{
        this.loader=true;
        this.UserRepo.GetUsersByrole(this.CurrentTeamId,4).subscribe(
          (data:any) =>{
            if(data.status == true){
              this.Users=data.data;
            }
            else
            {
              alert(data.error);
            }
          },
         );
         this.loader=false;
      }
   }

   GetallSeniors()
{
    this.UserRepo.GetUsersByrole(this.CurrentTeamId,3).subscribe(
    (data:any) => {
      if(data.status == true){
        this.Seniors = data.data;
      }
      else{
        alert(data.error);
      }
    })
}

   openmodal() {
    const ref =  this.modalService.open(UseroperationComponent, { size: 'lg' });
    ref.componentInstance.ModalTitle='Add New User..';
    ref.componentInstance.ModalButton='Add';
    ref.componentInstance.ISDelete = 0;
    ref.componentInstance.IsUpdate = 0;
  }
   edit(user){
     localStorage.setItem("CurrentUserData",JSON.stringify(user));
     const ref = this.modalService.open(UseroperationComponent, { size: 'lg' });
     ref.componentInstance.ModalTitle='Updating User..';
     ref.componentInstance.ModalButton='Update';
     ref.componentInstance.ISDelete = 0;
     ref.componentInstance.IsUpdate = 1;
   }

   delete(user)
   {
    localStorage.setItem("CurrentUserData",JSON.stringify(user));
     const ref = this.modalService.open(UseroperationComponent, { size: 'lg' });
     ref.componentInstance.ModalTitle='Confirm Deleting....';
     ref.componentInstance.ModalButton='Delete';
     ref.componentInstance.ISDelete = 1;
     ref.componentInstance.IsUpdate = 0;
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
                  if( role.id==4 )
                  {
                    return role;
                  }
              });

         }


     })
 }
 ShowUsersByRole(){
   if( this.CurrentViewRoleId != 0){
   this.loader=true;
   this.UserRepo.GetUsersByrole(this.CurrentTeamId,this.CurrentViewRoleId).subscribe(
     (data: any) =>{
      if(data.status == true)
      {
        this.Users=data.data;
      }
      else{
        alert(data.error);
      }
     },
    );
    this.loader=false;
   }
   else{
    this.CurrentViewSeniorId = 0;
     this.getall();
   }
 }
}

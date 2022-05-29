import { Component, OnInit } from '@angular/core';
import { UserrepositoryService } from 'src/app/shared/services/userrepository.service';
import { GlobalsettingsService } from 'src/app/shared/services/globalsettings.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuperadminteamComponent } from 'src/app/shared/Modals/superadminteam/superadminteam.component';
import { TeamrepositoryService } from 'src/app/shared/services/teamrepository.service';
import { ParentEntity } from 'src/app/shared/models/ParentEntity';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
msg;
LoginForm;
Teams:ParentEntity[];
  constructor(
    private settings:GlobalsettingsService,
    private userrepository:UserrepositoryService,
    private teamrepository:TeamrepositoryService,
    private router:Router,
    private modalService: NgbModal,
    private fb: FormBuilder
  )
  {
    this.LoginForm = this.fb.group({
      username: ['',[Validators.required] ],
      password: ['', [Validators.required]]
    });
    this.LogOut();
    this.GetAllTeams();
  }
  GetAllTeams()
  {
    this.teamrepository.GetAll().subscribe(
      d=> {
        this.Teams=d;
        console.log(this.Teams);
      }
    );
  }
  ngOnInit() {
  }

login(){

  this.userrepository.LogIn(this.LoginForm.value.username,this.LoginForm.value.password).subscribe(
    (d:any)=> {
      if (d.responce=="Invalid Data.." || d.responce=="undefined")
      {
           localStorage.removeItem("LoggingUser");
           this.msg="invalid data..";
      }
      else
       {
           if(d.responce.roleId==1)
           {
              // super Admin
                localStorage.setItem("LoggingUser",JSON.stringify(d.responce));
                localStorage.setItem("LogingRole",JSON.stringify(d.responce.roleId));
                localStorage.setItem("LoggingTeam",JSON.stringify(this.Teams[0].id));
                this.router.navigateByUrl('/home');

           }
           else {
              localStorage.setItem("LoggingUser",JSON.stringify(d.responce));
              localStorage.setItem("LoggingTeam",JSON.stringify(d.responce.teamId));
              localStorage.setItem("LogingRole",JSON.stringify(d.responce.roleId));
              this.router.navigateByUrl('/home');
           }
       }
    },
    error =>{
      console.log(error);
      this.msg="Network Error..";
    }
  );
}


hidemsg(){
  this.msg="";
}

LogOut()
{
  localStorage.removeItem("LoggingUser");
  localStorage.removeItem("LoggingTeam");
  localStorage.removeItem("LogingRole");
}

}

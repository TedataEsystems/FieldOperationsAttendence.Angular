import { Component, OnInit } from '@angular/core';
import { ChangePassword } from 'src/app/shared/models/ChangePassword';
import { GlobalsettingsService } from 'src/app/shared/services/globalsettings.service';
import { UserrepositoryService } from 'src/app/shared/services/userrepository.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  ChangPasswordForm:ChangePassword={"id":0,"currentPassword":'',"newPassword":'',"teamId":0};
  current='';
  currentst='';
  newpass='';
  newst='';
  confirm='';
  confirmst='';
  userid:number;
  status="";
  loader=false;
  constructor(
    private settings: GlobalsettingsService,
    private userrepository:UserrepositoryService,
    private router:Router,
   ) {

      this.userid=this.settings.LogingUserId();
   }
  ngOnInit() {
  }

  changpassword(){

    if(this.userid && this.current  && this.newpass)
    {
      this.ChangPasswordForm.id=this.userid;
      this.ChangPasswordForm.currentPassword = this.current;
      this.ChangPasswordForm.newPassword = this.newpass;
      this.loader=true;
      this.userrepository.ChangePassword(this.ChangPasswordForm).subscribe(
        (data:any) => 
        {
          if(data.status)
          {
            this.loader=false;
            this.settings.ChangePasswordStatus();
            this.router.navigateByUrl('/home');
          }
          else  {
              this.status = data.error;
              this.loader=false;
          }
        },
        error=>{
          console.log(error);
          alert("network error");
        }

      );

    }
  }

  currentkeyup()
  {
      if(!this.current)
      {
        this.currentst=" Current Password IS Required";
      }
      else {

        this.currentst="";
      }
  }

  newkeyup()
  {
    if(!this.newpass)
    {
      this.newst=" New Password IS Required";
    }
    else {

      if(this.newpass.length < 8)
      {
        this.newst="Minimum length is 8 Degits";
      }
      else{
        this.newst="";
      }

    }
  }

  confirmkeyup()
  {
    if(!this.confirm)
    {
      this.confirmst=" Confirm Password IS Required";
    }
    else {
      if (this.confirm!=this.newpass)
      {
        this.confirmst="Not Matched";
      }
      else{
        this.confirmst="";
      }

    }
  }



}

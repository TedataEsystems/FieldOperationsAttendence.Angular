import { Injectable } from '@angular/core';
import { Usermodel } from '../models/usermodel';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/LoginModel';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalsettingsService {
  [x: string]: any;

  public Apiurl:string = "http://172.29.29.9:1990/api/";
  // public Apiurl:string = "http://172.29.29.8:8020/api/";
  //public Apiurl:string = "http://localhost:58956/api/";
model:LoginModel = {
  username:'',
  password:''
};
user:Usermodel;
CurrentTeam;
CurrentRole;
  constructor(
   private http: HttpClient,
   private router: Router
  ) { }
  Url()
  {
    return this.Apiurl;
  }

  LogingUser()
  {
    let obg =  localStorage.getItem("LoggingUser");
   if(obg)
   {
    this.user=JSON.parse(obg);
    return this.user;
   }
   return "";
  }

  LogingUserId()
  {
    let obg =  localStorage.getItem("LoggingUser");
    if(obg)
    {
      this.user=JSON.parse(obg);
      return Number(this.user.id);
    }
    return 0;
  }

  LogingRole()
  {
    let obg =  localStorage.getItem("LogingRole");
   if(obg)
   {
    this.CurrentRole=JSON.parse(obg);
    return this.CurrentRole;
   }
  }

  LogingTeam()
  {
    let obg =  localStorage.getItem("LoggingTeam");
   if(obg)
   {
    this.CurrentTeam=JSON.parse(obg);
    return this.CurrentTeam;
   }
   return "";
  }

  IsAuthenticatd()
  {
    var user = localStorage.getItem("LoggingUser");
    let role =  localStorage.getItem("LogingRole");
    let team =  localStorage.getItem("LoggingTeam");
    if(!user || user == "undefined" || !role || role == "undefined" || !team || team == "undefined")
    {
      this.router.navigateByUrl('/login');
    }

    this.user=JSON.parse(user);
    if(this.user.passwordChanged == false)
    {
      this.router.navigateByUrl('/changepassword');
    }

  }

  ChangePasswordStatus()
  {
    var user = localStorage.getItem("LoggingUser");
    this.user=JSON.parse(user);
    this.user.passwordChanged=true;
    localStorage.setItem("LoggingUser",JSON.stringify(this.user));
  }

}

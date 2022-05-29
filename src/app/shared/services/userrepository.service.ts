import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usermodel } from '../models/usermodel';
import { Subject, Observable } from 'rxjs';
import { UserTransacionMsg } from '../models/user-transacion-msg';
import { GlobalsettingsService } from './globalsettings.service';
import { LoginModel } from '../models/LoginModel';
import { ChangePassword } from '../models/ChangePassword';

@Injectable({
  providedIn: 'root'
})
export class UserrepositoryService {
  [x: string]: any;
  CurrentUserId
  CurrentTeamId;
  CurrentRoleId;
  model:LoginModel={
    username:'',
    password:''
  };
  public usersubject = new Subject<UserTransacionMsg>();
adduser(model: UserTransacionMsg)
{
  this.usersubject.next(model);
}
getUser(): Observable<UserTransacionMsg> {
  return this.usersubject.asObservable();
}
  constructor(
    private http:HttpClient,
    private settings: GlobalsettingsService
  )
  {
      this.CurrentUserId = settings.LogingUserId();
      this.CurrentTeamId = settings.LogingTeam();
      this.CurrentRoleId = settings.LogingRole();
   }


  LogIn(username:string,password:string)
  {
       this.model.username=username;
       this.model.password=password;
       return this.http.post(this.settings.Url()+'users/Login',this.model);
  }


  GetByTeamId(taemid:number)
  {
    return this.http.get<any[]>(this.settings.Url()+'users/'+taemid);
  }

  Search(search:string)
  {
    let teamId =Number(this.settings.LogingTeam());
    return this.http.get<Usermodel[]>(this.settings.Url()+'users/Search/'+teamId+'/'+search);
  }

  GetUserData(id:number)
  {
    return this.http.get(this.settings.Url()+'users/getuserdata/'+id);
  }

  // GetAllSeniors(){
  //   return this.http.get(this.settings.Url()+'users')
  //   .pipe(
  //     map( (el: any) => {
  //       return el.filter(x=>x.roleId==3);
  //     } )
  //  )
  // }

  GetUsersByrole(taemid:number,roleid:number){
    return this.http.get(this.settings.Url()+'users/GetUsersByrole/'+taemid+'/'+roleid)
  }

  PostUser(user:Usermodel)
  {

    user.teamId = Number(this.settings.LogingTeam());
    user.creator = Number(this.settings.LogingUserId());
    user.seniorId= Number(user.seniorId);
    user.roleId= Number(user.roleId);
    user.imageId=0;
    user.employeeNumber = user.employeeNumber.toString();
    user.nationalId = user.nationalId.toString();
    console.log(user);
    return this.http.post(this.settings.Url()+'users',user);
  }

  UploadImage(img:FormData)
  {
    return this.http.post(this.settings.Url()+'users/UploadImage',img);
  }

  RemoveImage(id:number)
  {
    return this.http.post(this.settings.Url()+'users/RemoveImage',id);
  }
  PutUser(user:Usermodel)
  {
    user.teamId = Number(this.settings.LogingTeam());
    user.creator = Number(this.settings.LogingUserId());
    user.seniorId= Number(user.seniorId);
    user.roleId= Number(user.roleId);
    user.imageId=0;
    user.employeeNumber = user.employeeNumber.toString();
    user.nationalId = user.nationalId.toString();
    console.log(user);
    return this.http.put(this.settings.Url()+'users',user);
  }

  ChangePassword(model:ChangePassword)
  {
    model.teamId = Number(this.settings.LogingTeam());
    return this.http.post(this.settings.Url()+'users/ChangPassword',model);
  }

  DeleteUser(id:number)
  {
    let teamId = Number(this.settings.LogingTeam());
    let creatorid = Number(this.settings.LogingUserId());
    return this.http.delete(this.settings.Url()+'users/'+id+'/'+teamId+'/'+creatorid);
  }
}

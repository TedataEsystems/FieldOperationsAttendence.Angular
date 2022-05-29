import { Injectable } from '@angular/core';
import { Permissionmodel } from '../models/permissionmodel';
import { HttpClient } from '@angular/common/http';
import { GlobalsettingsService } from './globalsettings.service';
import { Permissiontypemodel } from '../models/permissiontypemodel';
import { Subject, Observable } from 'rxjs';
import { PermissionTransacionMsg } from '../models/PermissionTransacionMsg';
import { GetPermissionModel } from '../models/GetPermissionModel';

@Injectable({
  providedIn: 'root'
})
export class PermissionrepositoryService {

  constructor(
    private http:HttpClient,
    private settings:GlobalsettingsService
  ) { }

  public PermissionSubject = new Subject<PermissionTransacionMsg>();
  addpermission(model: PermissionTransacionMsg)
  {
    this.PermissionSubject.next(model);
  }
  getpermission(): Observable<PermissionTransacionMsg> {
    return this.PermissionSubject.asObservable();
  }

  Getall()
  {
    return this.http.get<Permissiontypemodel[]>(this.settings.Url()+'Permissions/');
  }

  Post(permission:Permissionmodel)
  {
    permission.creator=Number(this.settings.LogingUserId());
    permission.teamid =Number(this.settings.LogingTeam());
    permission.permissionTypeId =Number(permission.permissionTypeId);
    return this.http.post<Permissionmodel>(this.settings.Url()+'Permissions',permission);
  }
  Put(permission:Permissionmodel)
  {
    permission.creator=Number(this.settings.LogingUserId());
    permission.teamid =Number(this.settings.LogingTeam());
    permission.permissionTypeId =Number(permission.permissionTypeId);
    return this.http.put<Permissionmodel>( this.settings.Url()+'Permissions',permission);
  }

  Delete(id:number)
  {
   let creator=Number(this.settings.LogingUserId());
   let teamid =Number(this.settings.LogingTeam());
    return this.http.delete<Permissionmodel>( this.settings.Url()+'Permissions/'+id+'/'+creator+'/'+teamid);
  }

  GetPermissionByTime(GetPermissionModel:GetPermissionModel)
  {
    GetPermissionModel.permissintype_id=Number(GetPermissionModel.permissintype_id);
    return this.http.post<Permissionmodel[]>(this.settings.Url()+'Permissions/GetPermissionByTime',GetPermissionModel);
  }

  GetDefualtPermission(userid:number)
  {
    return this.http.get<Permissionmodel[]>(this.settings.Url()+'Permissions/GetDefualtPermission/'+ userid);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsettingsService } from './globalsettings.service';
import { Subject, Observable } from 'rxjs';
import { ParentEntityTransactionMsg } from '../models/ParentEntityTransactionMsg';
import { ParentEntity } from '../models/ParentEntity';

@Injectable({
  providedIn: 'root'
})
export class PermissiontyperepositoryService {
  url:string;
  public PermissionTypeSubject = new Subject<ParentEntityTransactionMsg>();
  addpermissiontype(model: ParentEntityTransactionMsg)
  {
    this.PermissionTypeSubject.next(model);
  }
  getpermissiontype(): Observable<ParentEntityTransactionMsg> {
    return this.PermissionTypeSubject.asObservable();
  }
  constructor(
    private http:HttpClient,
    private settings: GlobalsettingsService
    ) { 
      this.url=this.settings.Url();
    }

  GetAll()
  {
    return this.http.get<ParentEntity[]>(this.url+'PermissionTypes');
  }

  Put(model:ParentEntity)
  {
    debugger;
    model.creator=Number(this.settings.LogingUserId());
    return this.http.put<ParentEntity>(this.url+'PermissionTypes/',model);
  }
  Post(model:ParentEntity)
  {
    model.creator=Number(this.settings.LogingUserId());
    return this.http.post<ParentEntity>(this.url+'PermissionTypes/',model);
  }
  Delete(id)
  {
    let cr=Number(this.settings.LogingUserId());
    return this.http.delete<ParentEntity>(this.url+'PermissionTypes/'+id+'/'+cr);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParentEntity } from '../models/ParentEntity';
import { GlobalsettingsService } from './globalsettings.service';
import { Subject, Observable } from 'rxjs';
import { ParentEntityTransactionMsg } from '../models/ParentEntityTransactionMsg';

@Injectable({
  providedIn: 'root'
})
export class TeamrepositoryService {
  url:string;
  constructor(
    private http:HttpClient,
    private settings:GlobalsettingsService
  ) {
    this.url=this.settings.Url();
  }

  public TeamSubject = new Subject<ParentEntityTransactionMsg>();
  addteam(model: ParentEntityTransactionMsg)
  {
    this.TeamSubject.next(model);
  }
  getteam(): Observable<ParentEntityTransactionMsg>
  {
    return this.TeamSubject.asObservable();
  }

  GetAll()
  {
    return this.http.get<ParentEntity[]>(this.url+'Teams');
  }


  Put(model:ParentEntity)
  {

    model.creator=Number(this.settings.LogingUserId());
    return this.http.put<ParentEntity>(this.url+'Teams',model)
  }

  Post(model:ParentEntity)
  {
    model.creator=Number(this.settings.LogingUserId());
    return this.http.post<ParentEntity>(this.url+'Teams',model)
  }

  Delete(id:number)
  {
    let creator=Number(this.settings.LogingUserId());
    return this.http.delete<ParentEntity>(this.url+'Teams/'+id+'/'+creator);
  }
}

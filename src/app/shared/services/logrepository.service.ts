import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsettingsService } from './globalsettings.service';
import { LogModel } from '../models/LogModel';

@Injectable({
  providedIn: 'root'
})
export class LogrepositoryService {

  constructor(
   private http: HttpClient,
   private settings:GlobalsettingsService
  ) { }

  GetAll()
  {
    return this.http.get<LogModel[]>(this.settings.Url()+'logs');
  }
  GetByTeam()
  {
    let teamid = Number(this.settings.LogingTeam());
    return this.http.get<LogModel[]>(this.settings.Url()+'logs/'+teamid);
  }
  Search(search:string)
  {

    return this.http.get<LogModel[]>(this.settings.Url()+'logs/Search/'+search);
  }
}

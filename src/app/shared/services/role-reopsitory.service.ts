import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsettingsService } from './globalsettings.service';


@Injectable({
  providedIn: 'root'
})

export class RoleReopsitoryService {
  constructor(
    private http :HttpClient,
    private settings: GlobalsettingsService
    ) { }
  GetAll(){
    return this.http.get(this.settings.Url()+'roles');
  }
  

  }

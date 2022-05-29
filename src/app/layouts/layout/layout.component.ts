import { Component, OnInit } from '@angular/core';
import { GlobalsettingsService } from 'src/app/shared/services/globalsettings.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  UserName:string="";
  user;
  CurrentRoleId;
  constructor(
private ss : GlobalsettingsService
  ) {
    this.CurrentRoleId=this.ss.LogingRole();
     this.user = this.ss.LogingUser()
      this.UserName =this.user.name;
   }

  ngOnInit() {
  }



}

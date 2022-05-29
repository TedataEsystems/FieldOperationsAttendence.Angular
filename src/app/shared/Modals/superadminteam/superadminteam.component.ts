import { Component, OnInit } from '@angular/core';
import { ParentEntity } from '../../models/ParentEntity';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamrepositoryService } from '../../services/teamrepository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-superadminteam',
  templateUrl: './superadminteam.component.html',
  styleUrls: ['./superadminteam.component.scss']
})
export class SuperadminteamComponent implements OnInit {
  Teams:ParentEntity[];
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private teamrepository:TeamrepositoryService,
    private router:Router
  )
   {
    config.backdrop = 'static';
    config.keyboard = false;
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

close(){
  localStorage.removeItem("LoggingUser");
  localStorage.removeItem("LoggingTeam");
  localStorage.removeItem("LogingRole");
  this.modalService.dismissAll();
}
  ngOnInit() {
  }

  SelectTeam(teamid){
    debugger;
    console.log(teamid);
    if (teamid && teamid != "Select..") {
      localStorage.setItem("LoggingTeam",JSON.stringify(teamid));
      this.modalService.dismissAll();
      this.router.navigateByUrl('/home');
    }
  }

}

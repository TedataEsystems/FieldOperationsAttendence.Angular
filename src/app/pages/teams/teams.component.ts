import { Component, OnInit } from '@angular/core';
import { TeamrepositoryService } from 'src/app/shared/services/teamrepository.service';
import { ParentEntity } from 'src/app/shared/models/ParentEntity';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamoperationComponent } from 'src/app/shared/Modals/teamoperation/teamoperation.component';
import { GlobalsettingsService } from 'src/app/shared/services/globalsettings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
Teams:ParentEntity[];
loader=false;
page=1;
pageSize=10;
  constructor(
    private teamrepository: TeamrepositoryService,
    private modalService: NgbModal,
    private settings:GlobalsettingsService,
    private router:Router
  )
  {
    this.settings.IsAuthenticatd();
   }


ngOnInit() {
    this.GetAllTeams();
    this.teamrepository.getteam().subscribe(a=>{
      console.log(a);
      if(a.key==1)
      {
         // add
         console.log(a.ParentEntity);
         this.Teams.push(a.ParentEntity);
      }

      if(a.key==2)
      {
         // edit
         let index = this.Teams.findIndex(x => x.id ===a.ParentEntity.id);
         this.Teams[index]=a.ParentEntity;
      }

      if(a.key==3)
      {
         // delete
         let index = this.Teams.findIndex(x => x.id ===a.ParentEntity.id);
         this.Teams.splice(index,1);

      }

    });
}
GetAllTeams()
{
  this.teamrepository.GetAll().subscribe(
    d=> {
      this.Teams=d;
    }
  );
}
openmodal() {
  const ref =  this.modalService.open(TeamoperationComponent, { size: 'lg' });
  ref.componentInstance.ModalTitle='Add New Team..';
  ref.componentInstance.ModalButton='Add';
  ref.componentInstance.ISDelete = 0;
  ref.componentInstance.IsUpdate = 0;
}
 edit(team){
   localStorage.setItem("CurrentTeamData",JSON.stringify(team));
   const ref = this.modalService.open(TeamoperationComponent, { size: 'lg' });
   ref.componentInstance.ModalTitle='Updating Team..';
   ref.componentInstance.ModalButton='Update';
   ref.componentInstance.ISDelete = 0;
   ref.componentInstance.IsUpdate = 1;
 }

 delete(team)
 {
  localStorage.setItem("CurrentTeamData",JSON.stringify(team));
   const ref = this.modalService.open(TeamoperationComponent, { size: 'lg' });
   ref.componentInstance.ModalTitle='Confirm Deleting....';
   ref.componentInstance.ModalButton='Delete';
   ref.componentInstance.ISDelete = 1;
   ref.componentInstance.IsUpdate = 0;
}

loginwith(team)
{
  localStorage.setItem("LoggingTeam",JSON.stringify(team.id));
  this.router.navigateByUrl('/home');
}

}

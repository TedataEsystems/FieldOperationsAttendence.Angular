import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { ParentEntity } from '../../models/ParentEntity';
import { TeamrepositoryService } from '../../services/teamrepository.service';
import { ParentEntityTransactionMsg } from '../../models/ParentEntityTransactionMsg';

@Component({
  selector: 'app-teamoperation',
  templateUrl: './teamoperation.component.html',
  styleUrls: ['./teamoperation.component.scss']
})
export class TeamoperationComponent implements OnInit {
  CurrentTeamData:ParentEntity={
    id:0,
    name:'',
    creator:0,
    teamid:0
  };
  TeamForm;
  IsUpdate=0;
  ISDelete=0;
  ModalTitle;
  ModalButton;
  constructor(
  config: NgbModalConfig,
   private modalService: NgbModal,
   private fb: FormBuilder,
   private teamrepository:TeamrepositoryService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    var obg = localStorage.getItem("CurrentTeamData")
    localStorage.removeItem("CurrentTeamData");
    if (obg) {
      this.CurrentTeamData = JSON.parse(obg);
      console.log(this.CurrentTeamData);
    }
    this.TeamForm = this.fb.group({
      id: [this.CurrentTeamData.id,],
      name: [this.CurrentTeamData.name, [Validators.required]]
    })
   }

  ngOnInit() {
  }

  close(){
    this.modalService.dismissAll();
  }
  Save(){
   if(this.IsUpdate == 0)
   {
      // Create
      this.teamrepository.Post(this.TeamForm.value).subscribe(
        (d)=>{
          let model:ParentEntityTransactionMsg={
            key:1,
            ParentEntity:d
          }
          this.teamrepository.addteam(model);
        }
        ,
      error=>{
        console.log(error);
        alert('Network error');
      }
      );
   }
   else
   {
    // update
    this.teamrepository.Put(this.TeamForm.value).subscribe(
      d=>{
        let model: ParentEntityTransactionMsg ={
          key:2,
          ParentEntity:d
        }
        this.teamrepository.addteam(model);
      }
      ,
      error=>{
        console.log(error);
        alert('Network error');
      }
    );
   }
  this.close();
  }
  Delete()
  {
    this.teamrepository.Delete(this.CurrentTeamData.id).subscribe(
      d=>{
        console.log(d);
        let model: ParentEntityTransactionMsg={
          key:3,
          ParentEntity:d
        }
        this.teamrepository.addteam(model);
      }
      ,
      error=>{
        console.log(error);
        alert('Network error');
      }
    );
    this.close();
  }

}

import { Component, OnInit } from '@angular/core';
import { GlobalsettingsService } from 'src/app/shared/services/globalsettings.service';
import { LogModel } from 'src/app/shared/models/LogModel';
import { LogrepositoryService } from 'src/app/shared/services/logrepository.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
logs:LogModel[]=[];
page:number=1;
pageSize=50;
searchval;
loader=false;
  constructor(
    private logrepository:LogrepositoryService,
   private settings:GlobalsettingsService
  ) {
    this.settings.IsAuthenticatd();
    this.getall();
  }

  ngOnInit() {
  }
  getall()
  {
    this.loader=true;
   this.logrepository.GetByTeam().subscribe(
     d=>{
       this.logs=d;
       this.loader=false;
     }
   );
  }

  Onsearchchange(searchval)
   {

      if(searchval)
      {
          this.loader = true;
          this.logrepository.Search(searchval).subscribe(
            data => {
              this.logs=data;
            },
            error => {
              console.log(error);
              alert('error');
            }
          );
          this.loader = false;
      }
      else {
        this.getall();
      }
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsettingsService } from './globalsettings.service';
import { ImageTransacionMsg } from '../models/ImageTransacionMsg';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagerepositoryService {

  constructor(
      private http:HttpClient,
      private settings: GlobalsettingsService)
     { }

     public ImgSubject = new Subject<ImageTransacionMsg>();
     addimg(model: ImageTransacionMsg)
     {
       this.ImgSubject.next(model);
     }
     getimg(): Observable<ImageTransacionMsg> {
       return this.ImgSubject.asObservable();
     }


  UploadImage(img:FormData)
{
  return this.http.post(this.settings.Url()+'images/uploadimage',img);
}

RemoveImage(id:number)
{
  return this.http.post(this.settings.Url()+'images/removeimage',id);
}
}




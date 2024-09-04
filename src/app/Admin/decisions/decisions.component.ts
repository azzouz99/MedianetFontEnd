import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../services/services/notification.service";
import {HttpHeaders} from "@angular/common/http";
import {TokenService} from "../../services/services/token/token.service";
import {ProjectService} from "../../services/services/Project/project.service";

@Component({
  selector: 'app-decisions',
  templateUrl: './decisions.component.html',
  styleUrls: ['./decisions.component.scss']
})
export class DecisionsComponent implements OnInit{
  desicionsList:any;
  psd:any;
constructor(private notif:NotificationService,private serviceProject:ProjectService) {
}
ngOnInit() {
  this.getdetails();
  this.getProjectDetails();
}

  getdetails(){
  this.notif.findNotificationForProjectInProgress().subscribe(
    data=> {

      console.log(data);
    },error => {
      console.log(error);
    }
  )
}
getInProgress(){
  this.notif.getBystatus("NOT_YET").subscribe(
    data=>{
      this.desicionsList=data;
    },error => {
      console.log(error);
    }
  )
}
  getProjectDetails(){
 this.serviceProject.getProjectDetails().subscribe(
   data=> {
this.psd=data;
     console.log(data);
   },error => {
     console.log(error);
   }
 )
  }
}

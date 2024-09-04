import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../services/services/token/token.service";
import {NavigationEnd, Router} from "@angular/router";
import {ImageServiceService} from "../../services/services/image-service.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  showSidebar = true;
  userConnected: any | null = null;
  imageUrl: string = '/assets/image/UserPhoto/user-default.png'; // Default image
  isAdmin=false;

  constructor(private tokenService : TokenService,private router: Router,private imageService: ImageServiceService) {

  }

  ngOnInit() {
    this.userConnected = this.tokenService.getUserId();
    this.checkIfAdmin();
  //  console.log('Connected User:', this.userConnected);

    this.userConnected = this.tokenService.getUserId();

    this.updateImageUrl();
  }
 isAuthenticated() : boolean{
    return this.tokenService.isTokenValid();
 }

  updateImageUrl() {
    const timestamp = new Date().getTime();
    if(this.userConnected.image!=null){
      this.imageUrl = `http://localhost:8080/images/${this.userConnected.image}`;}
    this.loadImage(this.imageUrl);
  }

  loadImage(imageUrl: string) {
    this.imageService.getImage(imageUrl).subscribe(
      (imageData: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result as string;
        };
        reader.readAsDataURL(imageData);
      },
      (error) => {
        console.error('Error fetching image:', error);
      }
    );
  }
  checkIfAdmin():void{
    if(this.userConnected.roles){
      const rolesArray = this.userConnected.roles.split(",");
      this.isAdmin=rolesArray.includes('ROLE_ADMIN');
    }
  }
  logout() {
    localStorage.removeItem('token')
    window.location.reload();
  }

}

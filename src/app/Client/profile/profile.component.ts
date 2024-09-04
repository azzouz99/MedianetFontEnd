import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../services/services/token/token.service";
import {UserControllerService} from "../../services/services/user-controller.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ImageServiceService} from "../../services/services/image-service.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  userConnected: any | null = null;
  selectedFile: File | null = null;
  imageUrl: string = '/assets/image/UserPhoto/user-default.png'; // Default image
  first_name: string='';
  last_name:string='';


  constructor( private router: Router,
               private tokenService: TokenService,
               private userControllerService: UserControllerService,
               private snackBar: MatSnackBar,
               private imageService:ImageServiceService

  ) {}

  ngOnInit() {
    this.userConnected = this.tokenService.getUserId();
    console.log('Connected User:', this.userConnected);
    this.updateImageUrl();
    this.first_name=this.userConnected.firstName;
    this.last_name=this.userConnected.lastName;

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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadFile() {
    if (this.selectedFile || this.first_name!=this.userConnected.firstName || this.last_name!=this.userConnected.lastName ){
    const formData = new FormData();
    if (this.selectedFile) {

      formData.append('file', this.selectedFile, this.selectedFile.name);
}
    if (this.first_name!=this.userConnected.firstName) {
      formData.append('first_name', this.first_name);
    }
    if(this.last_name!=this.userConnected.lastName){
      formData.append('last_name', this.last_name);
    }
      this.userControllerService.uploadUserImage({ body: formData }).subscribe(
        response => {
          console.log('File uploaded successfully', response);
          this.router.navigate(['/home']);
          this.showSuccessPopup('File uploaded successfully');
          // Update userConnected object with new image information
          if (this.userConnected) {
            this.userConnected.image = this.selectedFile?.name;
          }
          // Reload image from the server with a unique query parameter
          this.updateImageUrl();
        },
        error => {
          console.error('Error uploading file', error);
          this.router.navigate(['/home']);
        }
      );
    //  this.router.navigate(['home']);
    }

  }

  showSuccessPopup(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }
}


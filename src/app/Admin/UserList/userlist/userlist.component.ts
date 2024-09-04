import {Component, OnInit} from '@angular/core';
import {User} from "../../../services/models/user";
import {AuthenticationService} from "../../../services/services/authentication.service";
import {ImageServiceService} from "../../../services/services/image-service.service";
import {UserService} from "../../../services/services/User/user.service";

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit{
  users: User[] = [];


  errorMsg: string = '';
  imageUrl: string = '/assets/image/UserPhoto/user-default.png'; // Default image
  constructor(private userService:AuthenticationService,private imageService:ImageServiceService,private service:UserService) {
  }
  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUser().subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.users.forEach(user => {
          if (user.image) {
            this.fetchImage(user);
          } else {
            user.image = '/assets/image/UserPhoto/user-default.png'; // Fallback for users without images
          }
        });
      },
      error: (err) => {
        console.error('Error fetching users', err);
        this.errorMsg = 'Error fetching users';
      }
    });
  }
  fetchImage(user: any): void {
    this.imageService.getImage("http://localhost:8080/images/"+user.image).subscribe(
      (imageData: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          user.image = reader.result as string;
        };
        reader.readAsDataURL(imageData);
      },
      (error) => {
        console.error('Error fetching image:', error);
      }
    );
  }
  fetchUsers(role:string): void {
    if (role) {
      this.service.getUsersByRole(role).subscribe(
        (data: User[]) => {
          this.users = data;
          this.users.forEach(user => {
            if (user.image) {
              this.fetchImage(user);
            } else {
              user.image = '/assets/image/UserPhoto/user-default.png'; // Fallback for users without images
            }
          });
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
    }
  }
}

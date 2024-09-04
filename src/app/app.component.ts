import {Component, OnInit} from '@angular/core';
import {TokenService} from "./services/services/token/token.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Frontend_Medianet';
  isLoginRoute: boolean = false;
  constructor(private tokenService: TokenService,private router: Router) {}
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginRoute = this.router.url === '/login' || this.router.url === '/register' ;
      }
    });
  }

  isAuthenticated() : boolean{
    return this.tokenService.isTokenValid();
  }



}

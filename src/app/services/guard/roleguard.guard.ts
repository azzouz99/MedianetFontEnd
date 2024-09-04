import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../services/token/token.service";

export const roleguardGuard: CanActivateFn = (route, state) => {
  const authService = inject(TokenService);
  const router = inject(Router);
  if (!authService.isTokenValid()) {
    router.navigate(['login']);
    return false;
  }

  const expectedRoles = route.data['expectedRoles'] as string[];
  const userRoles = authService.userRoles;

  console.log(userRoles); // Debug: check the user roles

  if (!userRoles || !expectedRoles || !userRoles.some(role => expectedRoles.includes(role))) {
    router.navigate(['unauthorized']);
    return false;
  }


  return true;

};

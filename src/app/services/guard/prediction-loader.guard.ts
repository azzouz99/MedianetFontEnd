// prediction-loader.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import {LoaderComponent} from "../../Commun/Loaders/loader/loader.component";


export const predictionLoaderGuard: CanActivateFn = (route, state) => {
  const dialog = inject(MatDialog);

  const dialogRef = dialog.open(LoaderComponent, {
    width: '100vw',
    height: '100vh',
    disableClose: true,
    panelClass: 'full-screen-dialog'
  });

  return of(true).pipe(
    delay(3000),
    finalize(() => dialogRef.close())
  );
};

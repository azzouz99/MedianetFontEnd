import { Component } from '@angular/core';
import {ArticlesService} from "../../../services/services/Articles/articles.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dialogclean',
  templateUrl: './dialogclean.component.html',
  styleUrls: ['./dialogclean.component.scss']
})
export class DialogcleanComponent {

  constructor(private articleService:ArticlesService,private snackBar:MatSnackBar) {
  }
  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: action === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }
  cleardata(){
    this.articleService.clearall().subscribe(
      result => {
        this.showSnackBar('La base de données est supprimée avec succés!', 'success')

      },error => {
        this.showSnackBar('Failed to clean dataset!', 'error')
      }
    )
  }
}

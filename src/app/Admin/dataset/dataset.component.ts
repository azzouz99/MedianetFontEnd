import {Component, OnInit} from '@angular/core';
import {ArticleControllerService} from "../../services/services/article-controller.service";
import {UploadfileService} from "../../services/services/uploadfile/uploadfile.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {ArticlesService} from "../../services/services/Articles/articles.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogcleanComponent} from "./dialogclean/dialogclean.component";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {ProjectService} from "../../services/services/Project/project.service";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss'],

})
export class DatasetComponent implements OnInit {
  selectedFileName: string = 'Not selected file';
  message: string = '';
  previous_upload:any;

  constructor(private dialog:MatDialog,private snackBar: MatSnackBar,private http:HttpClient,private articleService:ArticlesService,
              private projectService: ProjectService) {}
ngOnInit() {
    this.getProjectDetails();
}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.uploadFile(file);
    }
  }
  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);

    this.http.post('http://localhost:8080/api/article/upload', formData,{ responseType: 'text' }).subscribe(response=>{
     this.showSnackBar('File uploaded and data saved!', 'success')
        console.log('Response from server:', response);
    },error => {
      console.error('Error from server:', error);
      this.showSnackBar(error.error, 'error')
      }
    );
  }
  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: action === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogcleanComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
    });
  }
  download() {
    this.articleService.exportStructure().subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'headers.xlsx';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
  getProjectDetails(){
    this.projectService.getProjectDetails().subscribe(
      data=>{
        this.previous_upload=data
      },error => {
        console.log(error);
      }
    )
  }

  protected readonly NgStyle = NgStyle;
}

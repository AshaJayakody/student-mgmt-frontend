import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileInfo, FileRestrictions, FileState } from '@progress/kendo-angular-upload';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
/*   uploadSaveUrl = "saveUrl"; // should represent an actual API endpoint
  uploadRemoveUrl = "removeUrl"; // should represent an actual API endpoint
  restrictions: FileRestrictions = {
    allowedExtensions: [".xlxs", ".xls"],
  }; */
  private file: File | undefined;

  constructor(private http: HttpClient) {

  }
  /* public remove(upload: any, uid: string) {
    upload.removeFilesByUid(uid);
  }

  public showButton(state: FileState): boolean {
    return state === FileState.Uploaded ? true : false;
  } */

  public onSubmit() {
    const formData: FormData = new FormData();   
    formData.append('file', this.file!, this.file!.name); 

    this.http.post("http://localhost:4000/student-file/upload", formData)
    .subscribe((response) => {
    });
  }
  
  public onFileChange(fileChangeEvent: Event) {
    const target = fileChangeEvent.target as HTMLInputElement;
    const files = target.files as FileList;
    this.file = files[0];
  }

  private async upload(file: any) {
    
  }

}

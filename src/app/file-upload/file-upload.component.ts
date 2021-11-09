import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as io from 'socket.io-client';
import { NotificationService } from '../core/services/notification/notification.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  private files: File | undefined;

  private socket: any;
  private messages: string[];

  constructor(private http: HttpClient, private notificationService: NotificationService, private router: Router) {
    this.socket = io.connect('http://localhost:8080');
  }

  ngOnInit(): void {
    this.messages = new Array();

    this.socket.on("connect", () => {
      console.log(`connect ${this.socket.id}`);
    });

    this.socket.on("disconnect", () => {
      console.log(`disconnect`);
    });
    
    this.socket.on('message', (msg: any) => {
      this.messages.push(msg);
      this.notificationService.show(msg);

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/home']);
    });
}

  public onSubmit() {
    const formData: FormData = new FormData();   
    formData.append('file', this.files!, this.files!.name); 

    this.http.post("http://localhost:4000/student-file/upload", formData).subscribe(() => {});
  }
  
  public onFileChange(fileChangeEvent: Event) {
    const target = fileChangeEvent.target as HTMLInputElement;
    const files = target.files as FileList;
    this.files = files[0];
  }
}

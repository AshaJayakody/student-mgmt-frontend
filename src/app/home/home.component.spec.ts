import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { GraphqlService } from '../core/modules/graphql/graphql.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { StudentService } from '../students/student.service';
import { StudentsComponent } from '../students/students.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let studentService: StudentService;
  let notificationService: NotificationService;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [NotificationService, GraphqlService, StudentService],
      declarations: [ HomeComponent, StudentsComponent, FileUploadComponent]
    })
    .compileComponents();

    studentService = TestBed.inject(StudentService);
    notificationService = TestBed.inject(NotificationService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

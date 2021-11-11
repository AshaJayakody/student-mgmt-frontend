import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import * as _ from 'lodash';

import { GridDataResult } from "@progress/kendo-angular-grid";
import { State, process } from "@progress/kendo-data-query";

import { Student } from "./student";
import { formatDate } from "@angular/common";
import { durationInYears } from '@progress/kendo-date-math';
import { GET_ALL_STUDENTS } from "./query/get-all-student-query";
import REMOVE_STUDENT from "./query/remove-student-mutation";
import UPDATE_STUDENT from "./query/update-student-mutation";
import { UpdateStudentInput } from "./inputs/update-student.input";
import { DialogRef, DialogService } from "@progress/kendo-angular-dialog";
import { map } from "rxjs/operators";
import { StudentService } from "./student.service";
import { GraphqlService } from "../core/modules/graphql/graphql.service";


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
    public view: Observable<GridDataResult>;
    public originalItems: any[];
    public gridState : State = {
        sort: [],
        skip: 0,
        take: 10
    };

    private dateformat:string = 'yyyy-MM-dd';
    private locale:string = 'en-US';

    editedRowIndex: number | undefined;
    editedStudent: Student | undefined;

    constructor(private gqlService:GraphqlService, private studentService:StudentService) {
    }

    public ngOnInit(){
        this.loadData();
    }

    public onStateChange(state: State) {
        this.gridState = state;
    }

    public editHandler({sender, rowIndex, dataItem}: {sender: any , rowIndex: number, dataItem: any}) {
        this.closeEditor(sender);

        this.editedRowIndex = rowIndex;
        this.editedStudent = Object.assign({}, dataItem);

        sender.editRow(rowIndex);
    }

    public cancelHandler({sender, rowIndex}: {sender : any, rowIndex: number}) {
        this.closeEditor(sender, rowIndex);
    }

    public saveHandler({sender, rowIndex, dataItem, isNew}: {sender: any, rowIndex: number, dataItem: any, isNew: boolean}) {
      let updateStudentInput: UpdateStudentInput = this.generateUpdateStudentInput(dataItem.id, dataItem.firstName, dataItem.lastName, dataItem.email, dataItem.dateOfBirth);

      this.gqlService.executeMutation({
        mutation : UPDATE_STUDENT,
        variables: {
          updateStudentInput: updateStudentInput
        }       
      })
      .subscribe(
        (result) => {
          if(result!= null){
            console.log("successfully updated!" , result); 
            this.loadData();        
          }
        },
        (err) => {
          console.log("error occured in updating!", err)
        },
      );

        sender.closeRow(rowIndex);

        this.editedRowIndex = undefined;
        this.editedStudent = undefined;
    }

    public removeHandler({dataItem}: any) {
      this.gqlService.executeMutation({
        mutation : REMOVE_STUDENT,
        variables: {
          id: dataItem.id
        }       
      })
      .subscribe(
        (result) => {
          if(result!= null){
            console.log("successfully removed!" , result); 
            this.loadData();        
          }
        },
        (err) => {
          console.log("error occured!")
        },
      );
    }

    public closeEditor(grid: any, rowIndex = this.editedRowIndex): void {
        grid.closeRow(rowIndex);
        this.resetItem(this.editedStudent);
        this.editedRowIndex = undefined;
        this.editedStudent = undefined;
    }

    public resetItem(dataItem: any){
      if (!dataItem) {
          return;
        }
    
        // find orignal data item
        const originalDataItem = this.originalItems.find(
          (item) => item.id === dataItem.id
        );
    
        // revert changes
        Object.assign(originalDataItem, dataItem);
  }

    public async loadData(){
        this.originalItems = [];
        
        this.gqlService.executeQuery(GET_ALL_STUDENTS).then(
            (gqlResult: any) => {
              gqlResult.data["getAllStudent"].map((student: Student) => {
                this.originalItems.push({
                  id: student.id,
                  firstName: student.firstName,
                  lastName: student.lastName,
                  email: student.email,
                  dateOfBirth: formatDate(new Date(student.dateOfBirth), this.dateformat, this.locale),
                  age: this.calculateAge(new Date(student.dateOfBirth))
                });
              });

              this.originalItems = _.sortBy(this.originalItems, 'id'); 
              this.view = this.studentService.pipe(
                map(() => process(this.originalItems, this.gridState)),
              );
            },
          ).catch((e) => {
            console.log("error in fetching students");         
          });
    }

    public calculateAge(dateOfBirth: Date): number{
      let today = new Date();
      let ageCompleteDate = new Date(today.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate());
      let yearGap = durationInYears(dateOfBirth, today);

      if(today < ageCompleteDate){
        return --yearGap
      }

      return yearGap;
    }

    public generateUpdateStudentInput (id: number, firstName: string, lastName: string, email: string, dateOfBirth: Date): UpdateStudentInput{
      let updateStudentInput: UpdateStudentInput = new UpdateStudentInput();
      updateStudentInput.id = id;
      updateStudentInput.firstName = firstName;
      updateStudentInput.lastName = lastName;
      updateStudentInput.email = email;
      updateStudentInput.dateOfBirth = dateOfBirth;

      return updateStudentInput;
    }
}


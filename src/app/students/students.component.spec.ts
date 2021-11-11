import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { GraphqlService } from '../core/modules/graphql/graphql.service';
import {
  ApolloTestingModule
} from 'apollo-angular/testing';

import { StudentsComponent } from './students.component';
import { GridComponent, GridModule } from '@progress/kendo-angular-grid';
import { Student } from './student';
import { State } from '@progress/kendo-data-query';
import { UpdateStudentInput } from './inputs/update-student.input';

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;
  let graphqlService: GraphqlService;

  let std = {
    id: "1",
    firstName: "test1",
    lastName: "user",
    email: "test1user@gmail.com",
    dateOfBirth: new Date(1992,8,4),
    age: 29
  }

  let queryResult = {
    data: {
      getAllStudent: [{
        id: 304,
        dateOfBirth: "1992-04-08T00:00:00.000Z",
        email: "ashajayakody@gmail.com",
        firstName: "Asha",
        lastName: "Jayakody"
      }],
    },
  }

  beforeEach(async () => {
    const gqlServiceStub = () => ({
      executeQuery: (query: any) => ({
        then: () => ({}),
      }),
      executeMutation: (mutation : any) => ({
        subscribe: () => ({}),
      }),
    });

    await TestBed.configureTestingModule({
      providers:[StudentsComponent,
        {
          provide: GraphqlService,
          useFactory: gqlServiceStub
        },
      ],
      imports: [
        FormsModule,
        GridModule,
        ApolloTestingModule
      ],
      declarations: [ StudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    graphqlService = TestBed.inject(GraphqlService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(graphqlService, 'executeQuery').and.callThrough();
      component.ngOnInit();
      expect(graphqlService.executeQuery).toHaveBeenCalled();
    });
  });

  describe('removeHandler', () => {
    it(`makes expected calls`, () => {
      spyOn(graphqlService, 'executeMutation').and.callThrough();
      //spyOn(component, 'loadData').and.callThrough();
      const dataItem = { dataItem: { id: 1 } };
      component.removeHandler(dataItem);      
      expect(graphqlService.executeMutation).toHaveBeenCalled();
      //expect(component.loadData).toHaveBeenCalled();
    });
  });

  describe('calculateAge', () => {
    it(`should calculate age correclty`, () => {
      let actual = component.calculateAge(new Date(1992,8,4));
      expect(actual).toEqual(29);
    });

    it(`should calculate age correclty if not completed age`, () => {
      let actual = component.calculateAge(new Date(1992,12,4));
      expect(actual).toEqual(28);
    });
  });

  describe('closeEditor', () => {
    it(`should make expected calls`, () => {
      spyOn(component, 'resetItem').and.callThrough();
      let grid = { closeRow: () => {} };
      component.closeEditor(grid, 1); 
      expect(component.resetItem).toHaveBeenCalled();
    });
  });

  describe('ResetItem', () => {
    it(`should make expected calls`, () => {
      spyOn(Object, 'assign').and.callThrough();
      const dataItem = { dataItem: { id: 1 } };
      component.originalItems = [dataItem];
      component.resetItem(dataItem); 
      expect(Object.assign).toHaveBeenCalled()
    });
  });

  describe('OnStateChange', () => {
    it(`should successfully assign values`, () => {
      let gridState : State = {
        sort: [],
        skip: 1,
        take: 10
    };
      component.onStateChange(gridState); 
      expect(component.gridState).toBe(gridState);
    });
  });

  describe('CancelHandler', () => {
    it(`should make expected calls`, () => {
      spyOn(component, 'closeEditor').and.callThrough();
      let sender = { closeRow: () => {} };
      let rowIndex = 1;
      component.cancelHandler({sender, rowIndex}); 
      expect(component.closeEditor).toHaveBeenCalled();
    });
  });

  describe('generateUpdateStudentInput', () => {
    it(`should return expected`, () => {
      var expected = new UpdateStudentInput();
      expected.id = 1;
      expected.firstName = 'test1';
      expected.lastName = 'user';
      expected.email = 'test1user@gmail.com';
      expected.dateOfBirth = new Date(1992,8,4);
      var result = component.generateUpdateStudentInput(1, 'test1', 'user', 'test1user@gmail.com', new Date(1992,8,4)); 
      expect(result).toEqual(expected);
    });
  });

  describe('editHandler', () => {
    it(`should make expected calls`, () => {
      spyOn(component, 'closeEditor').and.callThrough();
      const sender = { editRow: () => {}, closeRow: () => {} };
      const rowIndex = 1;
      const dataItem = { dataItem: std };
      component.editHandler({sender, rowIndex, dataItem}); 
      expect(component.closeEditor).toHaveBeenCalled();
      expect(component.editedRowIndex).toBe(rowIndex);
    });
  });

    describe('saveHandler', () => {
      it(`should make expected calls`, () => {
        spyOn(graphqlService, 'executeMutation').and.callThrough();
        spyOn(component, 'generateUpdateStudentInput').and.callThrough();
        const sender = { closeRow: () => {} };
        const rowIndex = 1;
        const dataItem = { dataItem: std };
        const isNew = true;
        component.saveHandler({sender, rowIndex, dataItem, isNew}); 
        expect(graphqlService.executeMutation).toHaveBeenCalled();
        expect(component.generateUpdateStudentInput).toHaveBeenCalled();
      });
    });
});


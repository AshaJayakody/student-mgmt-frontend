import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends BehaviorSubject<any[]> {

  constructor() {
    super([]);
  }

  private data: any[] = [];

}

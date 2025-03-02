import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, timer } from 'rxjs';
import { Student } from './students-data.model';
import { studentData } from './students-data.data';

@Injectable({ providedIn: 'root' })
export class HighchartsService {
  constructor(private readonly http: HttpClient) {

  }


  getData() {
    return timer(2000).pipe(
      map(() => {
        const stData: Student[] = [];
        studentData.forEach((item) => {
          stData.push(item);
        });
        return stData;
      })
    );
  }
}

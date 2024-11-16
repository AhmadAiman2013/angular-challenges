import { inject, Injectable, signal } from '@angular/core';
import { Student } from '../model/student.model';
import { FakeHttpService } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  private http = inject(FakeHttpService);

  students = signal<Student[]>([]);

  constructor() {
    this.http.fetchStudents$.subscribe((students) => {
      this.students.set(students);
    });
  }

  addOne(student: Student) {
    this.students.update((students) => [...students, student]);
  }

  deleteOne(id: number) {
    this.students.set(this.students().filter((s) => s.id !== id));
    this.students.update((students) => students.filter((s) => s.id !== id));
  }
}

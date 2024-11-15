import { inject, Injectable, signal } from '@angular/core';
import { Teacher } from '../model/teacher.model';
import { FakeHttpService } from './fake-http.service';
@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  private http = inject(FakeHttpService);

  teachers = signal<Teacher[]>([]);

  constructor() {
    this.http.fetchTeachers$.subscribe((rawTeachers) => {
      this.teachers.set(rawTeachers);
    });
  }

  addOne(teacher: Teacher) {
    this.teachers.update((teachers) => [...teachers, teacher]);
  }

  deleteOne(id: number) {
    this.teachers.update((teachers) => teachers.filter((t) => t.id !== id));
  }
}

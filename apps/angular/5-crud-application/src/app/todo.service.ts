import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/todos';
  private readonly headers = new HttpHeaders().set(
    'Content-Type',
    'application/json; charset=utf-8',
  );

  getTodos() {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  updateTodo(todo: Todo) {
    return this.http.put<Todo>(
      `${this.baseUrl}/${todo.id}`,
      {
        id: todo.id,
        title: todo.title,
        body: todo.body,
        userId: todo.userId,
      },
      { headers: this.headers },
    );
  }

  delete(todo: Todo) {
    return this.http.delete<Todo>(`${this.baseUrl}/${todo.id}`);
  }
}

import { Component, inject } from '@angular/core';
import { LoadingComponent } from './loading.component';
import { LoadingService } from './loading.service';
import { Todo } from './todo.model';
import { TodoStore } from './todo.store';

@Component({
  standalone: true,
  imports: [LoadingComponent],
  selector: 'app-root',
  template: `
    <app-loading />
    @for (todo of store.todoEntities(); track todo.id) {
      <div>
        {{ todo.title }}
        <button [disabled]="loadingService.isLoading()" (click)="update(todo)">
          Update
        </button>
        <button [disabled]="loadingService.isLoading()" (click)="delete(todo)">
          Delete
        </button>
      </div>
    }
  `,
  providers: [TodoStore],
})
export class AppComponent {
  readonly loadingService = inject(LoadingService);
  readonly store = inject(TodoStore);

  update(todo: Todo) {
    this.store.update(todo);
  }

  delete(todo: Todo) {
    this.store.delete(todo);
  }
}

import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  type,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import {
  entityConfig,
  removeEntity,
  setAllEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap } from 'rxjs';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

const todoConfig = entityConfig({
  entity: type<Todo>(),
  collection: 'todo',
  selectId: (todo) => todo.id,
});

export const TodoStore = signalStore(
  withEntities(todoConfig),
  withMethods((store, todoService = inject(TodoService)) => ({
    loadTodo: rxMethod<void>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() => {
          return todoService.getTodos().pipe(
            tapResponse({
              next: (todos) => {
                patchState(store, setAllEntities(todos, todoConfig));
              },
              error: console.error,
            }),
          );
        }),
      ),
    ),
    update: rxMethod<Todo>(
      pipe(
        debounceTime(300),
        switchMap((todo) => {
          return todoService.updateTodo(todo).pipe(
            tapResponse({
              next: (todo) => {
                patchState(
                  store,
                  updateEntity(
                    { id: todo.id, changes: (todo) => todo },
                    todoConfig,
                  ),
                );
              },
              error: console.error,
            }),
          );
        }),
      ),
    ),
    delete: rxMethod<Todo>(
      pipe(
        debounceTime(300),
        switchMap((todo) => {
          return todoService.delete(todo).pipe(
            tapResponse({
              next: () => {
                patchState(store, removeEntity(todo.id, todoConfig));
              },
              error: console.error,
            }),
          );
        }),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadTodo();
    },
  }),
);

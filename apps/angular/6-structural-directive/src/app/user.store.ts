import { computed, Injectable, signal } from '@angular/core';

import { Role, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  #user = signal<User | undefined>(undefined);

  user = this.#user.asReadonly();

  isAdmin = computed(() => !!this.user()?.isAdmin);

  add(user: User) {
    this.#user.set(user);
  }

  matchesRole(roles: Role[]) {
    const user = this.user();
    const userRoles = user?.roles ?? [];
    return roles.some((role) => userRoles.includes(role));
  }

  matches(matchRoles: Role[] | Role) {
    return (
      this.isAdmin() ||
      this.matchesRole(Array.isArray(matchRoles) ? matchRoles : [matchRoles])
    );
  }
}

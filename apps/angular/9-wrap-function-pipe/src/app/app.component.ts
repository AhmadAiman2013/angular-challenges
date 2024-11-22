import { Component } from '@angular/core';
import { WrapperCallbackPipe } from './wrapper-callback.pipe';

@Component({
  standalone: true,
  imports: [WrapperCallbackPipe],
  selector: 'app-root',
  template: `
    @for (person of persons; track person) {
      <div>
        {{ showName | wrapperCallback: person.name : $index }}
        {{ isAllowed | wrapperCallback: person.age : $first }}
      </div>
    } @empty {
      <div>nothing</div>
    }
  `,
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];

  showName(name: string, index: number) {
    // very heavy computation
    return `${name} - ${index}`;
  }

  isAllowed(age: number, isFirst: boolean) {
    if (isFirst) {
      return 'always allowed';
    } else {
      return age > 25 ? 'allowed' : 'declined';
    }
  }
}

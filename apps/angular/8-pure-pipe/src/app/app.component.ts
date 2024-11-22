import { Component } from '@angular/core';
import { ComputePipe } from './comput.pipe';

@Component({
  standalone: true,
  imports: [ComputePipe],
  selector: 'app-root',
  template: `
    @for (person of persons; track person) {
      <div>
        {{ person | compute: $index }}
      </div>
    }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}

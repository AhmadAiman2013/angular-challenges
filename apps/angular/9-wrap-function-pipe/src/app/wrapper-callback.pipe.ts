import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapperCallback',
  standalone: true,
})
export class WrapperCallbackPipe implements PipeTransform {
  transform<T>(func: (...arg: any[]) => T, ...args: any[]): T {
    return func(...args);
  }
}

import { inject, Injectable, signal } from '@angular/core';
import { City } from '../model/city.model';
import { FakeHttpService } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private http = inject(FakeHttpService);

  cities = signal<City[]>([]);

  constructor() {
    this.http.fetchCities$.subscribe((rawCities) => {
      this.cities.set(rawCities);
    });
  }

  addOne(student: City) {
    this.cities.update((cities) => [...cities, student]);
  }

  deleteOne(id: number) {
    this.cities.update((cities) => cities.filter((s) => s.id !== id));
  }
}

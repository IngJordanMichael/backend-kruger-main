import { TestBed } from '@angular/core/testing';

import { CrudPokemonsService } from './crud-pokemons.service';

describe('CrudPokemonsService', () => {
  let service: CrudPokemonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudPokemonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

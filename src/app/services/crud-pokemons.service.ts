import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Pokemon } from '../Models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class CrudPokemonsService {

  urlBase : string = 'https://pokemon-pichincha.herokuapp.com/pokemons/';
 
  constructor(private http:HttpClient) { }

  getPokemons(){
    return this.http.get(this.urlBase).pipe(
      map(data=>data))
  }

}

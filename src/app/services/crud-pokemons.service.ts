import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Pokemon } from '../Models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class CrudPokemonsService {

  urlBase : string = 'https://pokemon-pichincha.herokuapp.com/pokemons/';
 
  constructor(private http:HttpClient) { }

  getAllPokemons(){
    return this.http.get(this.urlBase).pipe(
      map(data=>data))
  }

  createPokemon(pokemon:Pokemon){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(this.urlBase + "?idAuthor=1",pokemon,{headers: headers});
  }

  editPokemon(pokemon:Pokemon){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.put(this.urlBase + pokemon.id,pokemon,{headers: headers});
  }

  deletePokemon(id:any){
    return this.http.delete(this.urlBase + id);
  }

}

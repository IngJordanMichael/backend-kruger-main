import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../Models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class CrudPokemonsService {

 
  constructor(private http:HttpClient) { }

  getPokemonById(id:number){
    return this.http.get(environment.apiUrl + id).pipe(
      map(data=>data)
    );
  }

  getRecordsByIdAuthor(id:number){
    return this.http.get(environment.apiUrl + 'count?idAuthor=' + id).pipe(
      map(data=>data)
    );
  }

  getAllPokemons(){
    return this.http.get(environment.apiUrl).pipe(
      map(data=>data))
  }

  createPokemon(pokemon:Pokemon){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(environment.apiUrl + "?idAuthor=1",pokemon,{headers: headers});
  }

  editPokemon(pokemon:Pokemon){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.put(environment.apiUrl + pokemon.id,pokemon,{headers: headers});
  }

  deletePokemon(id:number){
    return this.http.delete(environment.apiUrl + id);
  }

}

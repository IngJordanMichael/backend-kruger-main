import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/Models/pokemon';
import { CrudPokemonsService } from 'src/app/services/crud-pokemons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  msg       : boolean = false;
  idPokemon : string = '';
  txt_id    : number = 0;
  idAuthor  : number = 0;
  pokemon   : Pokemon | any;
  cant_reg  : number = 0;
  
  constructor(private pokemonService:CrudPokemonsService) { }

  ngOnInit(): void {
  }

  search(){
    const slider = <HTMLInputElement> document.getElementById('idPokemon');
    this.txt_id = <number>(<unknown>slider.value);
    this.pokemonService.getPokemonById(this.txt_id).subscribe(data=>{
      this.pokemon = data;
      this.msg = false;
    }, err =>{
      this.msg = true;
    })
  }
  searchByAuthor(){
    const slider = <HTMLInputElement> document.getElementById('idAuthor');
    this.idAuthor = <number>(<unknown>slider.value);
    this.pokemonService.getRecordsByIdAuthor(this.idAuthor).subscribe( (data:any)=>{
      this.cant_reg = data;
    })
  }

}

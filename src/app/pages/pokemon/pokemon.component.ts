import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/Models/pokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  flag   : boolean = false;
  title  : string = '';
  pokemon: Pokemon | any;
  option : boolean = false;

  constructor() {}

  ngOnInit(): void {}

  show(){
    this.flag = !this.flag;
    this.title = 'Nuevo Pokémon';
    this.option = false;
  }

  listenSon(newState:boolean){
    this.flag = newState;
  }

  changeTitle(newTitle:any){
    this.title = newTitle;
  }

  editPokemon(newPokemon:any){
    this.pokemon = newPokemon;
    this.option = true;
  }

}

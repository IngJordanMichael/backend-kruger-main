import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/Models/pokemon';
import { CrudPokemonsService } from 'src/app/services/crud-pokemons.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  pokemons : Pokemon[] = [];

  constructor(private pokemonService:CrudPokemonsService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((data:any)=>{
      this.pokemons = data;
    });
  }

}

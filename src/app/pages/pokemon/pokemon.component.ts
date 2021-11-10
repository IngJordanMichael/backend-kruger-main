import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  flag: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  show(){
    this.flag = !this.flag;
  }

  listenSon(newState:boolean){
    this.flag = newState;
  }

}

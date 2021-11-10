import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { MyDTOptions } from 'src/app/helpers/MyDtOptions';
import { Pokemon } from 'src/app/Models/pokemon';
import { CrudPokemonsService } from 'src/app/services/crud-pokemons.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  pokemons : Pokemon[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @Output() pokemon:EventEmitter<Pokemon> = new EventEmitter<Pokemon>();
  @Output() flag: EventEmitter<boolean>;
  @Output() title: EventEmitter<string>;

  constructor(private pokemonService:CrudPokemonsService) { 
    this.flag = new EventEmitter<boolean>();
    this.title =  new EventEmitter<string>();
  }

  ngOnInit(): void {
    this.dtOptions = MyDTOptions;
    this.pokemonService.getAllPokemons().subscribe((data:any)=>{ 
      this.pokemons = data;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  emitState(pokemon:any){
    this.flag.emit(true);
    this.title.emit("Editando Pokémon");
    this.pokemon.emit(pokemon);
  }


  delete(id:any){
    Swal.fire({
      title: 'Estás seguro de eliminar este registro?',
      text: "No podrás revertir estos cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina el registro!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'El registro ha sido eliminado.',
          'success'
        )
        this.pokemonService.deletePokemon(id).subscribe(resp=>{
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
      }
    })
    
  }

}

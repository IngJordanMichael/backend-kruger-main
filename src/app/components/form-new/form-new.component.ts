import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from 'src/app/Models/pokemon';
import { CrudPokemonsService } from 'src/app/services/crud-pokemons.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-new',
  templateUrl: './form-new.component.html',
  styleUrls: ['./form-new.component.scss']
})
export class FormNewComponent implements OnInit {

  @Input() state: boolean = false;
  @Input() title: string = '';
  @Input() option: boolean = false;
  @Input() pokemon: Pokemon | any ;
  @Output() flag: EventEmitter<boolean>;


  form: any;

  rangeA : number = 50;
  rangeD : number = 50;
  rangeH : number = 50;

  constructor(private formB : FormBuilder, private pokemonService:CrudPokemonsService) { 
    this.flag = new EventEmitter<boolean>();
   }

  ngOnInit(): void {
    this.form = this.createForm();
    this.loadData();
    if(this.option==false) this.reset();
  }

  reset(){
    this.form.reset({
      name: '',
      image: '',
      type: ''
    });
    this.rangeA = 50;
    this.rangeD = 50;
    this.rangeH = 50;
  }

  loadData(){
    this.form.reset({
      name: this.pokemon.name,
      image: this.pokemon.image,
      type: this.pokemon.type
    });
    this.rangeA = this.pokemon.attack;
    this.rangeD = this.pokemon.defense;
    this.rangeH = this.pokemon.hp;
  }

  createForm(){
    return this.formB.group(
      {
        name     : ['',Validators.required],
        image    : ['',Validators.required],
        type     : ['',Validators.required]
      }
    );
  }

  validarCampo(campo:string):boolean{
    return (<boolean>this.form.get(campo)?.invalid) && (<boolean>this.form.get(campo)?.touched) 
  }

  emitState(){
    this.flag.emit(!this.state);
  }

  attack(){
    const slider = <HTMLInputElement> document.getElementById('sliderA');
    this.rangeA = <number>(<unknown>slider.value);
  }

  defending(){
    const slider = <HTMLInputElement> document.getElementById('sliderD');
    this.rangeD = <number>(<unknown>slider.value);
  }

  hp(){
    const slider = <HTMLInputElement> document.getElementById('sliderH');
    this.rangeH = <number>(<unknown>slider.value);
  }

  verified(){
    if(this.form.valid){
      this.emitState();
      if(this.option==false){
        let newPokemon: Pokemon = {
          name    : this.form.get('name').value,
          image   : this.form.get('image').value,
          type    : this.form.get('type').value,
          hp      : this.rangeH,
          attack  : this.rangeA,
          defense : this.rangeD,
          idAuthor : 1,
        }
        this.save(newPokemon);
      }else{
        this.pokemon.name = this.form.get('name').value;
        this.pokemon.image = this.form.get('image').value;
        this.pokemon.type = this.form.get('type').value;
        this.pokemon.attack= this.rangeA; 
        this.pokemon.defense = this.rangeD;
        this.pokemon.hp = this.rangeH;
        this.edit(this.pokemon);
      }
    }else{
      this.form.markAllAsTouched()
    }
  }

  edit(newPokemon:any){
    Swal.fire({
      title: 'Estás seguro de editar este registro?',
      text: "No podrás revertir estos cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualiza el registro!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pokemonService.editPokemon(this.pokemon).subscribe(
          resp => {
            Swal.fire(
              'Editado!',
              'El registro ha sido editado con éxito.',
              'success'
            );
            setTimeout(() => {
              window.location.reload();
            }, 1000);
        })
      }
    });
  }

  save(newPokemon:any){
      this.pokemonService.createPokemon(newPokemon).subscribe(resp=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto registrado con éxito',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
      })
  }

}

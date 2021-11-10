import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-new',
  templateUrl: './form-new.component.html',
  styleUrls: ['./form-new.component.scss']
})
export class FormNewComponent implements OnInit {

  @Input() state: boolean = false;
  @Output() flag: EventEmitter<boolean>;

  rangeA : number = 50;
  rangeD : number = 50;
  
  constructor() { 
    this.flag = new EventEmitter<boolean>();
   }

  ngOnInit(): void {
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

}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ChoiceModel } from '../choice.model';

@Component({
  selector: 'app-choice-tile',
  templateUrl: './choice-tile.component.html',
  styleUrls: ['./choice-tile.component.css'],
})
export class ChoiceTileComponent implements OnInit {
  @Input() choices: Array<ChoiceModel>;
  @Output() selected: EventEmitter<number> = new EventEmitter();
  active: number;

  constructor() {}

  ngOnInit(): void {}

  onClick(index: number) {
    this.selected.emit(this.choices[index].id);
    this.active = index;
  }
}

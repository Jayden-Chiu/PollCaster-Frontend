import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { ChoiceModel } from '../choice.model';

@Component({
  selector: 'app-choice-tile',
  templateUrl: './choice-tile.component.html',
  styleUrls: ['./choice-tile.component.css'],
})
export class ChoiceTileComponent implements OnInit {
  @Input() choices: Array<ChoiceModel>;
  @Input() alreadySubmitted: boolean;
  @Output() selected: EventEmitter<number> = new EventEmitter();
  active: number;
  isLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(
      (data: boolean) => (this.isLoggedIn = data)
    );
    this.isLoggedIn = this.authService.authenticated();
  }

  onClick(index: number) {
    if (!this.isLoggedIn) this.router.navigate(['/login'])
    if (this.alreadySubmitted) return;
    this.selected.emit(this.choices[index].id);
    this.active = index;
  }
}

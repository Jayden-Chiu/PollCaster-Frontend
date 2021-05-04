import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PollModel } from '../poll.model';

@Component({
  selector: 'app-poll-tile',
  templateUrl: './poll-tile.component.html',
  styleUrls: ['./poll-tile.component.css'],
})
export class PollTileComponent implements OnInit {
  selected: number;
  @Input() polls: Array<PollModel>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  submit() {
    console.log(this.selected);
  }
}

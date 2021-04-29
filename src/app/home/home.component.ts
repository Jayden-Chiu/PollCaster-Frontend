import { Component, OnInit } from '@angular/core';
import { PollModel } from '../shared/poll.model';
import { PollService } from '../shared/poll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  polls: Array<PollModel> = [];

  constructor(private pollService: PollService) {
    this.pollService.getPolls().subscribe((poll) => {
      console.log(poll);
      this.polls = poll.content;
    });
  }

  ngOnInit(): void {}
}

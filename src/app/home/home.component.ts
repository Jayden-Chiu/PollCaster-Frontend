import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { PollModel } from '../shared/poll.model';
import { PollService } from '../shared/poll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  polls: Array<PollModel> = [];
  page: number;
  pageSize: number;
  totalElements: number;

  constructor(private pollService: PollService) {
    this.page = 0;
    this.pageSize = 10;
  }

  ngOnInit(): void {
    this.pollService.getPolls(this.page, this.pageSize).subscribe((poll) => {
      this.polls = poll.content;
      this.totalElements = poll.totalElements;
      
    });
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page - 1;
    this.ngOnInit();
  }
}

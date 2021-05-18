import { Component, Input, Output, OnInit, TemplateRef, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { ApiResponseModel } from '../api-response.model';
import { PollModel } from '../poll.model';
import { PollService } from '../poll.service';
import { VoteRequestPayload } from '../vote-request';

@Component({
  selector: 'app-poll-tile',
  templateUrl: './poll-tile.component.html',
  styleUrls: ['./poll-tile.component.css'],
})
export class PollTileComponent implements OnInit {
  selected: number;
  pollId: number;
  userId: number;
  isLoggedIn: boolean;
  @Input() polls: Array<PollModel>;
  @Output() submitted: EventEmitter<boolean> = new EventEmitter();

  modalRef: BsModalRef;

  constructor(
    private authService: AuthService,
    private modalService: BsModalService,
    private pollService: PollService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(
      (data: boolean) => (this.isLoggedIn = data)
    );
    this.isLoggedIn = this.authService.authenticated();

    this.authService.userId.subscribe((data: number) => (this.userId = data));

    this.userId = this.authService.getId();
  }

  submit(pollId: number) {
    let voteRequestPayload: VoteRequestPayload = {
      choice: this.selected,
    };
    this.pollId = pollId;
    console.log(this.pollId);
    this.pollService
      .votePoll(this.pollId, voteRequestPayload)
      .subscribe((data) => {
        console.log(data);
        this.submitted.emit(true);
      });
  }

  delete() {
    this.router.navigate([this.router.url]);
    let res: ApiResponseModel;

    this.pollService.deletePoll(this.pollId).subscribe((data) => {
      if (data.success) {
        for (let i = 0; i < this.polls.length; i++) {
          let deletedPoll = this.polls[i];

          if (deletedPoll.id === this.pollId) {
            this.polls.splice(i, 1);
          }
        }
      }
    });

    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>, pollId: number) {
    this.pollId = pollId;
    this.modalRef = this.modalService.show(template);
  }
}

import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PollModel } from '../poll.model';

@Component({
  selector: 'app-poll-tile',
  templateUrl: './poll-tile.component.html',
  styleUrls: ['./poll-tile.component.css'],
})
export class PollTileComponent implements OnInit {
  selected: number;
  userId: number;
  isLoggedIn: boolean;
  @Input() polls: Array<PollModel>;

  modalRef: BsModalRef;

  constructor(
    private authService: AuthService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(
      (data: boolean) => (this.isLoggedIn = data)
    );
    this.isLoggedIn = this.authService.authenticated();

    this.authService.userId.subscribe(
      (data: number) => (this.userId = data)
    );
    
    this.userId = this.authService.getId();
  }

  submit() {
    console.log(this.selected);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}

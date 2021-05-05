import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollModel } from 'src/app/shared/poll.model';
import { PollService } from 'src/app/shared/poll.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userId: number;
  userPolls: Array<PollModel>;
  username: string;
  createdAt: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pollService: PollService,
    private userService: UserService
  ) {
    this.userId = this.activatedRoute.snapshot.params.userId;
  }

  ngOnInit(): void {
    this.pollService.getPollsByUser(this.userId).subscribe((data) => {
      this.userPolls = data.content;
      console.log(this.userPolls);
    });

    this.userService.getUserById(this.userId).subscribe((data) => {
      console.log(data);
      this.username = data.username;
      this.createdAt = data.createdAt;
    });
  }
}

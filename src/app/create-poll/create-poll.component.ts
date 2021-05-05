import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PollRequestPayload } from '../shared/poll-request';
import { PollService } from '../shared/poll.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css'],
})
export class CreatePollComponent implements OnInit {
  createPollForm: FormGroup;
  pollRequestPayload: PollRequestPayload;
  choices: FormArray;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pollService: PollService
  ) {
    this.pollRequestPayload = {
      title: '',
      choices: [],
    };
  }

  ngOnInit(): void {
    this.createPollForm = new FormGroup({
      title: new FormControl('', Validators.required),
      choices: new FormArray([new FormControl(''), new FormControl('')]),
    });
    this.choices = this.createPollForm.get('choices') as FormArray;
  }

  addChoice() {
    if (this.choices.length >= 5) return;
    this.choices.push(new FormControl(''));
  }

  removeChoice() {
    if (this.choices.length <= 2) return;
    this.choices.removeAt(this.choices.length - 1);
  }
  create() {
    this.pollRequestPayload.title = this.createPollForm.get('title').value;

    if (this.createPollForm.get('title').value.length <= 0) {
      return;
    }

    this.pollRequestPayload.choices = [];

    const choicesLength = this.choices.value.length;
    for (let i = 0; i < choicesLength; i++) {
      const value = this.choices.value[i];
      if (value.length <= 0 || value.length > 50) {
        this.choices.controls[i].markAsTouched();
        return;
      }
      this.pollRequestPayload.choices.push({ text: value });
    }

    const res = this.pollService.createPoll(this.pollRequestPayload);
    res.subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    console.log(this.pollRequestPayload);
    console.log('Submitting poll...');
  }
}

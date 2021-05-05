import { ChoiceRequestPayload } from './choice-request';

export interface PollRequestPayload {
  title: string;
  choices: Array<ChoiceRequestPayload>;
}

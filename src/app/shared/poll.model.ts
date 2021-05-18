import { ChoiceModel } from "./choice.model";
import { UserModel } from "./user.model";

export class PollModel {
  id: number;
  title: string;
  choices: Array<ChoiceModel>;
  createdBy: UserModel;
  totalVotes: number;
}

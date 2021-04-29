import { PollModel } from "./poll.model";

export class PageResponseModel {
  content: Array<PollModel>;
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

import { IRewardHistoryItem, IRewardListItem } from "../../../core/model";

export interface IRewardHistoryState {
  loading: boolean;
  items: IRewardListItem[];
  selectedItem: IRewardListItem;
}

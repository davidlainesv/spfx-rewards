import { IRewardListItem } from "../../../core/model";

export interface IRewardLastState {
  loading: boolean;
  items: IRewardListItem[];
  selectedItem: IRewardListItem;
}

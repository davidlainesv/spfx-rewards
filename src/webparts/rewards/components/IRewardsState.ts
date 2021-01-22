import { IRewardCatalogListItem } from "../../core/model";

export interface IRewardsState {
  selectedReward: IRewardCatalogListItem;
  showRewardGrid: boolean;
  filterListByRewardTypeId: number;
}
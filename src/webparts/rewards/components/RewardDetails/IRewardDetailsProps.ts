import { IRewardCatalogListItem, IRewardListItem } from "../../../core/model";

export interface IRewardDetailsProps extends IRewardListItem {
  hideTo?: boolean;
  Reward: IRewardCatalogListItem;
}

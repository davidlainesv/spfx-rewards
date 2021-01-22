import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IRewardCatalogListItem } from "../../core/model";

export interface IRewardsProps {
  context: WebPartContext;
  rewardOptions: IRewardCatalogListItem[];
}

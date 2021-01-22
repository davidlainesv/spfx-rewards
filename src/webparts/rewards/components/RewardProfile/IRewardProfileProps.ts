import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IRewardCatalogListItem } from "../../../core/model";

export interface IRewardProfileProps {
  context: WebPartContext;
  rewardCatalog: IRewardCatalogListItem[];
  selectedRewardId: number;
  onClickRewardScore: (rewardId: number) => void;
}

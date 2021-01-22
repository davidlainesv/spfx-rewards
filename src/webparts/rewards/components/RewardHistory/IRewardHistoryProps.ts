import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IRewardCatalogListItem } from "../../../core/model";

export interface IRewardHistoryProps {
  context: WebPartContext;
  rewardCatalog: IRewardCatalogListItem[];
  filterByRewardTypeId?: number;
  onClearFilter?: () => void;
}

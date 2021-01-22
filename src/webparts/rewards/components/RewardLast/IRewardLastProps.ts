import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IRewardCatalogListItem } from "../../../core/model";

export interface IRewardLastProps {
  context: WebPartContext;
  rewardCatalog: IRewardCatalogListItem[];
  top: number;
  filterByRewardTypeId?: number;
  onClearFilter?: () => void;
}

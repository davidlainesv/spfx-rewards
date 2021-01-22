import { IRewardListItem, IRewardCatalogListItem } from "../../../core/model";

export interface IRewardGridProps {
  items: IRewardCatalogListItem[];
  onSelect: (reward: IRewardCatalogListItem) => void;
  onDismiss: () => void;
}

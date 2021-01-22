import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IRewardCatalogListItem } from "../../../core/model";

export interface IRewardFormProps {
  context: WebPartContext;
  rewardOption: IRewardCatalogListItem;
  onSubmit: (result: any) => void;
  onDismiss: () => void;
}

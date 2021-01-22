import { IUserProfile } from "@pnp/sp/profiles";
import { IRewardListItem } from "../../../core/model";

export interface IRewardProfileState {
  rewards: IRewardListItem[];
  profile: IUserProfile;
}

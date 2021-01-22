export interface IUserLookup {
  Id: number;
  Title: string;
  EMail: string;
}

export interface IRewardCatalogListItem {
  Id: number;
  ImageUrl: string;
  Title: string;
  TextColor: string;
  BackgroundColor: string;
}

export interface IRewardListItem {
  Id: number;
  To: IUserLookup;
  ToId: string | number;
  Title: string;
  RewardId: number;
  Reward?: IRewardCatalogListItem;
  Created: string;
  AuthorId: number;
  Author: IUserLookup;
  Notes: string;
}

export interface IRewardCreationListItem {
  ToId: string | number;
  Title: string;
  RewardId: number;
  Notes: string;
}

export interface IRewardHistoryItem {
  reward: IRewardCatalogListItem;
  rewardId: number;
  rewardTitle: string;
  rewardImageUrl: string;
  from: string;
  created: string;
  notes: string;
}
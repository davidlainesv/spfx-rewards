import * as React from 'react';
import styles from './RewardProfile.module.scss';
import { IRewardProfileProps } from './IRewardProfileProps';
import { DefaultButton, Image, Stack, Text, Tooltip, TooltipHost, VerticalDivider } from '@fluentui/react';
import { IRewardProfileState } from './IRewardProfileState';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/profiles";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IRewardListItem, IRewardCatalogListItem } from '../../../core/model';
import { groupBy } from '@microsoft/sp-lodash-subset';

export default class RewardProfile extends React.Component<IRewardProfileProps, IRewardProfileState> {
  constructor(props: Readonly<IRewardProfileProps>) {
    super(props);

    this.state = {
      rewards: [],
      profile: ({} as any)
    };
  }

  public componentDidMount() {
    this.loadProfile();
    this.loadPersonalRewards();
  }

  public render(): React.ReactElement<IRewardProfileProps> {
    const rewardCatalogDict = groupBy(this.props.rewardCatalog, "Id");
    const rewardListDict = groupBy(this.state.rewards, "RewardId");
    return (
      <div className={styles.rewardProfile}>
        <Stack className={styles.container} tokens={{ childrenGap: 16 }}>
          <Stack horizontal tokens={{ childrenGap: 16 }}>
            <div>
              <Image width={75} height={75} src={"/_layouts/15/userphoto.aspx?accountname=" + this.props.context.pageContext.user.email}></Image>
            </div>
            <div>
              <Text>{this.state.profile.DisplayName}</Text>
              <Text>{(this.state.profile as any).JobTitle}</Text>
            </div>
          </Stack>
          <VerticalDivider></VerticalDivider>
          <Stack>
            <Stack horizontal>
              <Text>Mi score</Text>
            </Stack>
            <div style={{ display: "flex", flexWrap: "wrap", marginTop: 4 }}>
              {
                Object.keys(rewardListDict).map((rewardId: string, index: number, array: string[]) => {
                  const count = rewardListDict[rewardId].length;
                  const rewardCatalogItem = rewardCatalogDict[rewardId][0];
                  return this.onRenderGridItem(rewardCatalogItem, count, index === array.length - 1);
                })
              }
            </div>
          </Stack>
        </Stack>
      </div>
    );
  }

  private onRenderGridItem = (rewardCatalogItem: IRewardCatalogListItem, count: number, isLast: boolean) => {
    return <TooltipHost content={rewardCatalogItem.Title}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "start", marginRight: isLast ? 0 : 16, marginBottom: 8 }}>
        <DefaultButton onClick={() => { this.onClickRewardScore(rewardCatalogItem.Id); }} style={{ padding: 0, cursor: "pointer", height: "auto", width: "auto", minWidth: 0 }}>
          <div style={{ backgroundColor: rewardCatalogItem.BackgroundColor, padding: 16, width: 62, height: 62, boxSizing: "border-box" }}>
            <img width="100%" height="100%" src={rewardCatalogItem.ImageUrl}></img>
          </div>
        </DefaultButton>
        <Text style={{ marginLeft: 8 }}>x{count}</Text>
      </div>
    </TooltipHost>;
  }

  private onClickRewardScore = (rewardId: number) => {
    this.props.onClickRewardScore(rewardId);
  }

  private loadProfile = async () => {
    const profile = await sp.profiles.userProfile;
    this.setState({ profile });
  }

  private loadPersonalRewards = async () => {
    const rewardCatalogDict = groupBy(this.props.rewardCatalog, "Id");
    const items: IRewardListItem[] = await sp.web.lists.getByTitle("Reconocimientos").items
      .select("*, Author/Id, Author/Title, Author/EMail, To/Title, To/Title, To/EMail")
      .filter("ToId/EMail eq '" + this.props.context.pageContext.user.email + "'")
      .expand("Author, To")
      .get();
    this.setState({
      rewards: items.map(item => {
        return {
          ...item,
          Reward: rewardCatalogDict[item.RewardId] ? rewardCatalogDict[item.RewardId][0] : ({} as any)
        };
      })
    });
  }
}

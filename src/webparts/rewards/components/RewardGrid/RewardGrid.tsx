import * as React from 'react';
import styles from './RewardGrid.module.scss';
import { IRewardGridProps } from './IRewardGridProps';
import { DefaultButton, IconButton, Stack, Text } from '@fluentui/react';
import { GridLayout } from "@pnp/spfx-controls-react/lib/GridLayout";
import { IRewardCatalogListItem } from '../../../core/model';

export default class RewardGrid extends React.Component<IRewardGridProps> {
  public render(): React.ReactElement<IRewardGridProps> {
    return (
      <div className={styles.rewardGrid}>
        <Stack horizontal verticalAlign="center">
          <IconButton iconProps={{ iconName: "Back" }} onClick={() => { this.props.onDismiss(); }}></IconButton>
          <Text variant="mediumPlus">Reconocer a alguien</Text>
        </Stack>
        <div className={styles.wrapper}>
          {
            this.props.items.map((item) => {
              return <DefaultButton style={{ margin: 0, padding: 0, height: "auto", width: "auto" }} onClick={() => {
                this.props.onSelect(item);
              }}>
                <div style={{ width: "100%", color: item.TextColor, backgroundColor: item.BackgroundColor, padding: 16, boxSizing: "border-box" }}>
                  <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <div style={{ flex: "1 1 auto" }}>
                      <img width="80" height="80" src={item.ImageUrl}></img>
                    </div>
                    <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.Title}</div>
                  </div>
                </div>
              </DefaultButton>;
            })
          }
        </div>
      </div>
    );
  }

  private onSelectReward = (reward: IRewardCatalogListItem) => {
    this.setState({ selectedReward: reward });
  }

  private onSubmitRewardForm = (_result: any) => {
    this.setState({ selectedReward: null });
  }

  private onDismissRewardForm = () => {
    this.setState({ selectedReward: null });
  }
}

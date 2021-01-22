import * as React from 'react';
import styles from './Rewards.module.scss';
import { IRewardsProps } from './IRewardsProps';
import { Customizer, Pivot, PivotItem, PrimaryButton, Stack } from '@fluentui/react';
import RewardGrid from './RewardGrid/RewardGrid';
import { IRewardCatalogListItem } from '../../core/model';
import RewardForm from './RewardForm/RewardForm';
import RewardHistory from './RewardHistory/RewardHistory';
import { IRewardsState } from './IRewardsState';
import RewardProfile from './RewardProfile/RewardProfile';
import RewardLast from './RewardLast/RewardLast';
import { customizations } from '../../core/theme';

export default class Rewards extends React.Component<IRewardsProps, IRewardsState> {
  constructor(props: Readonly<IRewardsProps>) {
    super(props);

    this.state = {
      selectedReward: null,
      showRewardGrid: false,
      filterListByRewardTypeId: null
    };
  }

  public render(): React.ReactElement<IRewardsProps> {
    return (
      <Customizer {...customizations}>
        <div className={styles.rewards}>
          <Stack horizontal tokens={{ childrenGap: 16 }}>
            <div className={styles.container}>
              <div className={styles.profile}>
                <RewardProfile selectedRewardId={this.state.filterListByRewardTypeId} rewardCatalog={this.props.rewardOptions} onClickRewardScore={this.onClickRewardScoreSummary} context={this.props.context}></RewardProfile>
                <div style={{ padding: 16, textAlign: "center" }}>
                  <PrimaryButton onClick={this.onClickRewardButton}>Reconocer</PrimaryButton>
                </div>
              </div>
            </div>
            <Stack className={styles.container} grow>
              <div className={styles.pivot}>
                {
                  !this.state.selectedReward && !this.state.showRewardGrid &&
                  <Pivot aria-label="Reconocimientos" onLinkClick={this.onChangePivotItem}>
                    <PivotItem headerText="Últimos Rewards">
                      <RewardLast onClearFilter={this.onClearFilter} filterByRewardTypeId={this.state.filterListByRewardTypeId} top={5} rewardCatalog={this.props.rewardOptions} context={this.props.context}></RewardLast>
                    </PivotItem>
                    <PivotItem headerText="Mis Rewards">
                      <RewardHistory onClearFilter={this.onClearFilter} filterByRewardTypeId={this.state.filterListByRewardTypeId} rewardCatalog={this.props.rewardOptions} context={this.props.context}></RewardHistory>
                    </PivotItem>
                  </Pivot>
                }
                {
                  this.state.showRewardGrid &&
                  <RewardGrid items={this.props.rewardOptions} onSelect={this.onSelectReward} onDismiss={this.onDismissRewardGrid}></RewardGrid>
                }
                {
                  this.state.selectedReward &&
                  <RewardForm context={this.props.context} rewardOption={this.state.selectedReward} onSubmit={this.onSubmitRewardForm} onDismiss={this.onDismissRewardForm}></RewardForm>
                }
              </div>
            </Stack>
          </Stack>
        </div>
      </Customizer>
    );
  }

  private onClearFilter = () => {
    this.setState({ filterListByRewardTypeId: null });
  }

  private onChangePivotItem = () => {
    this.onClearFilter();
  }

  private onClickRewardScoreSummary = (rewardId: number) => {
    this.setState({ filterListByRewardTypeId: rewardId });
  }

  private onClickRewardButton = () => {
    this.setState({ showRewardGrid: true, selectedReward: null });
  }

  private onSelectReward = (reward: IRewardCatalogListItem) => {
    this.setState({ selectedReward: reward, showRewardGrid: false });
  }

  private onSubmitRewardForm = (_result: any) => {
    this.setState({ selectedReward: null, showRewardGrid: false });
  }

  private onDismissRewardForm = () => {
    this.setState({ selectedReward: null, showRewardGrid: true });
  }

  private onDismissRewardGrid = () => {
    this.setState({ showRewardGrid: false });
  }
}

import * as React from 'react';
import styles from './RewardDetails.module.scss';
import { IRewardDetailsProps } from './IRewardDetailsProps';
import { Image, Stack, Text } from '@fluentui/react';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import * as moment from 'moment';

export default class RewardDetails extends React.Component<IRewardDetailsProps> {
  public render(): React.ReactElement<IRewardDetailsProps> {
    return (
      <div className={styles.rewardDetails}>
        <Stack horizontal className={styles.container} tokens={{ childrenGap: 16 }}>
          <div>
            <Image width={75} height={75} src={"/_layouts/15/userphoto.aspx?accountname=" + this.props.To.EMail}></Image>
          </div>
          {
            !this.props.hideTo &&
            <Stack grow>
              <Stack horizontal>
                <Stack.Item grow>
                  <Text>{this.props.To.Title}</Text>
                </Stack.Item>
                <Stack.Item grow styles={{ root: { textAlign: "right" } }}>
                  <Text variant="small">{moment(this.props.Created).format("DD/MM/YYYY")}</Text>
                </Stack.Item>
              </Stack>
              <Text variant="smallPlus"><strong>{this.props.Reward.Title}</strong> por {this.props.Author.Title}</Text>
              <Text variant="small">{this.props.Notes}</Text>
            </Stack>
          }
          {
            this.props.hideTo &&
            <Stack grow>
              <Stack horizontal>
                <Stack.Item grow>
                  <Text variant="smallPlus"><strong>{this.props.Reward.Title}</strong> por {this.props.Author.Title}</Text>
                </Stack.Item>
                <Stack.Item grow styles={{ root: { textAlign: "right" } }}>
                  <Text variant="small">{moment(this.props.Created).format("DD/MM/YYYY")}</Text>
                </Stack.Item>
              </Stack>
              <Text variant="small">{this.props.Notes}</Text>
            </Stack>
          }
        </Stack>
      </div>
    );
  }
}

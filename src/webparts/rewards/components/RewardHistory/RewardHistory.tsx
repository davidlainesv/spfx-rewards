import * as React from 'react';
import styles from './RewardHistory.module.scss';
import { DetailsListLayoutMode, IColumn, Link, SelectionMode, ShimmeredDetailsList, Stack, Text } from '@fluentui/react';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IRewardHistoryProps } from './IRewardHistoryProps';
import { IRewardHistoryState } from './IRewardHistoryState';
import { IRewardCatalogListItem, IRewardHistoryItem, IRewardListItem } from '../../../core/model';
import RewardDetails from '../RewardDetails/RewardDetails';
import { groupBy } from '@microsoft/sp-lodash-subset';

export default class RewardHistory extends React.Component<IRewardHistoryProps, IRewardHistoryState> {
  private _rewardCatalogDict: { [id: number]: IRewardCatalogListItem; } = {};

  constructor(props: Readonly<IRewardHistoryProps>) {
    super(props);

    this.state = {
      loading: true,
      items: [],
      selectedItem: null
    };
  }

  public componentDidMount() {
    const rewardCatalogGrouped = groupBy(this.props.rewardCatalog, "Id");
    for (const key in rewardCatalogGrouped) {
      this._rewardCatalogDict[key] = rewardCatalogGrouped[key][0];
    }

    this.loadRewardItems();
  }

  public componentDidUpdate(prevProps: Readonly<IRewardHistoryProps>) {
    if (this.props.filterByRewardTypeId !== prevProps.filterByRewardTypeId) {
      this.loadRewardItems(this.props.filterByRewardTypeId);
    }
  }

  public render(): React.ReactElement<IRewardHistoryProps> {
    const columns: IColumn[] = [
      {
        key: 'Icono',
        name: 'Icono',
        isIconOnly: true,
        iconName: 'Page',
        minWidth: 16,
        maxWidth: 16,
        onRender: (item: IRewardHistoryItem) => {
          return <img style={{ verticalAlign: "middle", maxHeight: 16, maxWidth: 16 }} src={item.rewardImageUrl} alt={item.rewardTitle} />;
        },
      },
      { key: 'Reconocimiento', name: 'Reconocimiento', fieldName: 'rewardTitle', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'FechaRecibida', name: 'Fecha recibida', fieldName: 'created', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'DadoPor', name: 'Dado por', fieldName: 'from', minWidth: 100, maxWidth: 200, isResizable: true }
    ];

    let items: IRewardListItem[] = [];
    if (this.props.filterByRewardTypeId) {
      items = this.state.items.filter(item => item.RewardId === this.props.filterByRewardTypeId);
    } else {
      items = this.state.items;
    }

    return (
      <div className={styles.rewardHistory}>
        <Stack className={styles.container}>
          {
            !this.state.loading && items.length === 0 &&
            <Text>Sin reconocimientos aún.</Text>
          }
          {
            !this.state.loading && this.props.filterByRewardTypeId &&
            <Text variant="small">Filtrado por: {this._rewardCatalogDict[this.props.filterByRewardTypeId].Title} (<Link onClick={this.onClickClearFilterLink}>Limpiar</Link>)</Text>
          }
          <ShimmeredDetailsList
            columns={columns}
            items={items}
            layoutMode={DetailsListLayoutMode.justified}
            selectionMode={SelectionMode.none}
            enableShimmer={this.state.loading}
            onRenderRow={(props) => {
              return <RewardDetails {...props.item} hideTo={true}></RewardDetails>;
            }}
            onRenderDetailsHeader={() => {
              return null;
            }} />
        </Stack>
      </div>
    );
  }

  private onClickClearFilterLink = () => {
    if (this.props.onClearFilter) {
      this.props.onClearFilter();
    }
  }

  private loadRewardItems = (filterByRewardTypeId?: number) => {
    let filterString = "";
    if (filterByRewardTypeId) {
      filterString = "To/EMail eq '" + this.props.context.pageContext.user.email + "' and RewardId eq " + filterByRewardTypeId;
    } else {
      filterString = "To/EMail eq '" + this.props.context.pageContext.user.email + "'";
    }

    this.setState({ loading: true });
    return sp.web.lists.getByTitle("Reconocimientos").items
      .select("*, Author/Id, Author/Title, Author/EMail, To/Title, To/Title, To/EMail, Reward/Title")
      .filter(filterString)
      .expand("Author, To, Reward")
      .orderBy("Id", false)
      .get().then((items: IRewardListItem[]) => {
        items = items.map(item => {
          item.Reward = this._rewardCatalogDict[item.RewardId];
          return item;
        });
        this.setState({ items: items, loading: false });
      }, () => {
        this.setState({ loading: false });
      });
  }
}

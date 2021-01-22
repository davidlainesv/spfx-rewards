import * as React from 'react';
import styles from './RewardLast.module.scss';
import { DetailsListLayoutMode, IColumn, Link, SelectionMode, ShimmeredDetailsList, Stack, Text } from '@fluentui/react';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IRewardLastProps } from './IRewardLastProps';
import { IRewardLastState } from './IRewardLastState';
import { IRewardCatalogListItem, IRewardListItem } from '../../../core/model';
import RewardDetails from '../RewardDetails/RewardDetails';
import { groupBy } from '@microsoft/sp-lodash-subset';

export default class RewardLast extends React.Component<IRewardLastProps, IRewardLastState> {
  private _rewardCatalogDict: { [id: number]: IRewardCatalogListItem; } = {};

  constructor(props: Readonly<IRewardLastProps>) {
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

    this.loadLastRewardItems();
  }

  public componentDidUpdate(prevProps: Readonly<IRewardLastProps>) {
    if (this.props.filterByRewardTypeId !== prevProps.filterByRewardTypeId) {
      this.loadLastRewardItems(this.props.filterByRewardTypeId);
    }
  }

  public render(): React.ReactElement<IRewardLastProps> {
    const columns: IColumn[] = [
      {
        key: 'Icono',
        name: 'Icono',
        isIconOnly: true,
        iconName: 'Page',
        minWidth: 16,
        maxWidth: 16
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
      <div className={styles.rewardLast}>
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
              return <RewardDetails {...props.item}></RewardDetails>;
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

  private loadLastRewardItems = (filterByRewardTypeId?: number) => {
    let filterString = "";
    if (filterByRewardTypeId) {
      filterString = "RewardId eq " + filterByRewardTypeId;
    }

    this.setState({ loading: true });
    return sp.web.lists.getByTitle("Reconocimientos").items
      .select("*, Author/Id, Author/Title, Author/EMail, To/Title, To/Title, To/EMail, Reward/Title")
      .expand("Author, To, Reward")
      .filter(filterString)
      .orderBy("Id", false)
      .top(this.props.top)
      .get().then((items: IRewardListItem[]) => {
        this.setState({ items: items, loading: false });
      }, () => {
        this.setState({ loading: false });
      });
  }
}

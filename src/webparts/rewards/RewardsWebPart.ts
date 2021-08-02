import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import Rewards from './components/Rewards';
import { IRewardsProps } from './components/IRewardsProps';
import { setup as pnpSetup } from "@pnp/common";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IRewardCatalogListItem } from '../core/model';

export interface IRewardsWebPartProps {
  description: string;
}

export default class RewardsWebPart extends BaseClientSideWebPart<IRewardsWebPartProps> {
  private rewardOptions: IRewardCatalogListItem[] = [];

  protected async onInit(): Promise<void> {
    pnpSetup({
      spfxContext: this.context
    });

    return sp.web.lists.getByTitle("Opciones de Reconocimientos").items
      .get().then((items) => {
        this.rewardOptions = items.map(item => {
          item.ImageUrl = item.Image ? JSON.parse(item.Image).serverRelativeUrl : "";
          return item;
        });
      });
  }

  public render(): void {
    const element: React.ReactElement<IRewardsProps> = React.createElement(
      Rewards,
      {
        context: this.context,
        rewardOptions: this.rewardOptions
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return null;
  }
}
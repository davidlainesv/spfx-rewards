import * as React from 'react';
import styles from './RewardForm.module.scss';
import { IRewardFormProps } from './IRewardFormProps';
import { IPersonaProps } from '@pnp/spfx-controls-react/node_modules/office-ui-fabric-react';
import { DefaultButton, IconButton, Label, PrimaryButton, Spinner, SpinnerSize, Stack, Text, TextField } from '@fluentui/react';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { IRewardFormState } from './IRewardFormState';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IItemAddResult } from '@pnp/sp/items';
import { IRewardCreationListItem } from '../../../core/model';

export default class RewardForm extends React.Component<IRewardFormProps, IRewardFormState> {
  constructor(props: Readonly<IRewardFormProps>) {
    super(props);

    this.state = {
      invalidForm: true,
      notes: "",
      submitted: false,
      submitting: false,
      toId: ""
    };
  }

  public render(): React.ReactElement<IRewardFormProps> {
    return (
      <div className={styles.rewardForm}>
        <Stack className={styles.container} tokens={{ childrenGap: 16 }}>
          {
            !this.state.submitted && this.state.submitting &&
            <Stack verticalAlign="center" verticalFill={true} grow>
              <Spinner size={SpinnerSize.large} label="Submitting..." ariaLive="assertive" labelPosition="right" />
            </Stack>
          }
          {
            !this.state.submitted && !this.state.submitting &&
            <>
              <Stack horizontal verticalAlign="center">
                <IconButton iconProps={{ iconName: "Back" }} onClick={() => { this.props.onDismiss(); }}></IconButton>
                <Text variant="mediumPlus">Reconocimiento</Text>
              </Stack>
              <Stack horizontal tokens={{ childrenGap: 16 }} verticalAlign="center">
                <img width={25} height={25} src={this.props.rewardOption.ImageUrl}></img>
                <Label>{this.props.rewardOption.Title}</Label>
              </Stack>
              <Label required={true}>A quién</Label>
              <PeoplePicker
                context={this.props.context}
                peoplePickerWPclassName={styles.peoplePickerWp}
                placeholder="Ingresa un nombre y selecciona"
                personSelectionLimit={1}
                required={true}
                onChange={this.onChangeTo}
                principalTypes={[PrincipalType.User]}
                ensureUser={true}
                resolveDelay={500} />
              <TextField multiline rows={3} maxLength={50} label="Notas" required={true} placeholder="Añade una nota personalizada" value={this.state.notes} onChange={this.onChangeNotes}></TextField>
              <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 16 }}>
                <DefaultButton onClick={this.onClickDismiss}>Cancelar</DefaultButton>
                <PrimaryButton disabled={this.state.invalidForm} onClick={this.onClickSubmit}>Enviar</PrimaryButton>
              </Stack>
            </>
          }
        </Stack>
      </div>
    );
  }

  private onChangeTo = (items: IPersonaProps[]) => {
    if (items[0]) {
      const newValue = items[0].id;
      this.setState({ toId: newValue, invalidForm: !newValue as boolean });
    } else {
      this.setState({ toId: null, invalidForm: true });
    }
  }

  private onChangeNotes = (_event: React.FormEvent<HTMLTextAreaElement>, newValue?: string) => {
    this.setState({ notes: newValue });
  }

  private onClickSubmit = (_event: React.MouseEvent<PrimaryButton>) => {
    this.setState({ submitting: true }, () => {
      (async () => {
        const item: IRewardCreationListItem = {
          RewardId: this.props.rewardOption.Id,
          Title: this.props.rewardOption.Title,
          ToId: this.state.toId,
          Notes: this.state.notes
        };
        const iar: IItemAddResult = await sp.web.lists.getByTitle("Reconocimientos").items.add(item);
        this.props.onSubmit({ data: iar.data });
      })();
      this.setState({ submitted: true, submitting: false });
    });
  }

  private onClickDismiss = (_event: React.MouseEvent<DefaultButton>) => {
    this.props.onDismiss();
  }
}

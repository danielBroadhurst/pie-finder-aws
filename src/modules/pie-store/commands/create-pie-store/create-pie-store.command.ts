import { Command, CommandProps } from '../../../../libs/domain';

export class CreatePieStoreCommand extends Command {
  readonly pieStoreSlug: string;

  readonly storeName: string;

  readonly country: string;

  readonly postalCode: string;

  readonly street: string;

  constructor(props: CommandProps<CreatePieStoreCommand>) {
    super(props);
    this.pieStoreSlug = props.pieStoreSlug;
    this.storeName = props.storeName;
    this.country = props.country;
    this.postalCode = props.postalCode;
    this.street = props.street;
  }
}
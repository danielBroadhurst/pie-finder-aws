import { CommandProps } from '../../../../libs/domain';

export interface ICommand {

}

export interface ICommandBus<BaseCommand, Result> {
  registerHandler(handler: ICommandHandler<CommandProps<BaseCommand>, Result>): void;
  send(command: BaseCommand): Promise<Result>;
}

export interface ICommandHandler<BaseCommand, Result> {
  commandToHandle: string;
  execute(command: BaseCommand): Promise<Result>;
}

export class CommandBus<BaseCommand extends ICommand, Result> implements ICommandBus<BaseCommand, Result> {
  public handlers: Map<string, ICommandHandler<CommandProps<BaseCommand>, Result>> = new Map();

  public registerHandler(handler: ICommandHandler<CommandProps<BaseCommand>, Result>) {
    const targetCommand: string = handler.commandToHandle;
    if (this.handlers.has(targetCommand)) {
      return;
    }
    this.handlers.set(targetCommand, handler);
  }

  public async send<T extends CommandProps<BaseCommand>>(command: T) {
    if (this.handlers.has(command.constructor.name)) {
      return (this.handlers.get(command.constructor.name) as ICommandHandler<CommandProps<BaseCommand>, Result>).execute(command);
    } else {
      throw new Error('Handler not found');
    }
  }
}
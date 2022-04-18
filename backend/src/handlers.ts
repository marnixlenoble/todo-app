import { ITask, IUser } from "shared/types";
import _ from "lodash";

import { UserService, TaskService } from "./services";
import {
  CreateTaskCommand,
  DeleteTaskCommand,
  ListTasksCommand,
  LoginCommand,
  TaskStatus,
  UpdateTaskCommand,
} from "./types";
import { ErrorMessages, Activities } from "./constants";

class UserHandler {
  protected userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
}

class LoginHandler extends UserHandler {
  handle({ username }: LoginCommand): IUser {
    let user = this.userService.get(username);
    if (!user) user = this.userService.create(username);
    return user;
  }
}

class TaskHandler {
  protected taskService: TaskService;
  protected userService: UserService;

  constructor(taskService: TaskService, userService: UserService) {
    this.taskService = taskService;
    this.userService = userService;
  }
}

class ListTasksHandler extends TaskHandler {
  handle({ searchKeyWord }: ListTasksCommand): Array<ITask> {
    const currentUser = this.userService.currentUser;
    const tasks = this.taskService.list(currentUser.uuid);
    if (!searchKeyWord) return tasks;

    return _.filter(tasks, (task: ITask) =>
      task.title.toLowerCase().includes(searchKeyWord.toLowerCase())
    );
  }
}

class CreateTaskHandler extends TaskHandler {
  handle(command: CreateTaskCommand): ITask {
    const currentUser = this.userService.currentUser;
    return this.taskService.create(currentUser.uuid, { ...command });
  }
}

class UpdateTaskHandler extends TaskHandler {
  handle(command: UpdateTaskCommand): ITask {
    const currentUser = this.userService.currentUser;
    let { uuid, title, status } = command;
    if (!uuid || (status && !Object.values(TaskStatus).includes(status)))
      throw new Error(ErrorMessages.InvalidInput);

    return this.taskService.update(currentUser.uuid, { uuid, title, status });
  }
}

class DeleteTaskHandler extends TaskHandler {
  handle(command: DeleteTaskCommand): void {
    const currentUser = this.userService.currentUser;
    if (!command.uuid) throw Error(ErrorMessages.InvalidInput);

    return this.taskService.delete(currentUser.uuid, command.uuid);
  }
}

class GetRandomNameHandler extends TaskHandler {
  handle(): string {
    return _.sample(Activities) as string;
  }
}

export {
  LoginHandler,
  ListTasksHandler,
  CreateTaskHandler,
  UpdateTaskHandler,
  DeleteTaskHandler,
  GetRandomNameHandler,
};

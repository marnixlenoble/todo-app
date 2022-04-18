import { ITask, IUser, IUserInput } from "shared/types";
import { v4 as uuid } from "uuid";

import { ErrorMessages } from "./constants";
import { TaskStatus } from "./types";

class UserService {
  private _taskService: TaskService;
  private _users: Record<string, IUser>;
  private _currentUser: IUser | undefined;

  constructor(taskService: TaskService) {
    this._taskService = taskService;
    this._users = {};
    this._currentUser = undefined;
  }

  get(name: string): IUser | undefined {
    return this._users[name];
  }

  create(name: string): IUser {
    if (this.get(name)) throw new Error(ErrorMessages.ResourceAlreadyExists);

    const user = { uuid: uuid(), name };
    this._users[user.name] = user;
    this._taskService.initialize(user.uuid);

    return user;
  }

  get currentUser(): IUser {
    if (!this._currentUser) throw new Error(ErrorMessages.Unauthorized);
    return this._currentUser;
  }

  set currentUser(value: IUser | undefined) {
    this._currentUser = value;
  }
}

class TaskService {
  public _tasks: Record<string, Record<string, ITask>> = {};

  initialize(key: string) {
    this._tasks[key] = {};
    this.create(key, {
      title: "Create todo list",
      status: TaskStatus.Done,
    });
  }

  list(key: string): Array<ITask> {
    const tasks = this._tasks[key];
    return Object.values(tasks ?? {}).map((task, index) => ({
      ...task,
      index: index + 1,
    }));
  }

  create(
    key: string,
    {
      title,
      status = TaskStatus.NotDone,
    }: { title: string; status?: TaskStatus }
  ): ITask {
    const task = { uuid: uuid(), title, status };
    this._tasks[key][task.uuid] = task;
    return task;
  }

  update(
    key: string,
    task: { uuid: string; title?: string; status?: TaskStatus }
  ): ITask {
    if (!this._tasks[key][task.uuid])
      throw new Error(ErrorMessages.ResourceNotFound);

    this._tasks[key][task.uuid] = { ...this._tasks[key][task.uuid], ...task };
    return this._tasks[key][task.uuid];
  }

  delete(userId: string, taskId: string): void {
    delete this._tasks[userId][taskId];
  }
}

export { UserService, TaskService };

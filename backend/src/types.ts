export interface LoginCommand {
  username: string;
}

export interface RegisterCommand {
  username: string;
}

export interface ListTasksCommand {
  searchKeyWord?: string;
}

export interface CreateTaskCommand {
  title: string;
}

export interface UpdateTaskCommand {
  uuid?: string;
  title?: string;
  status?: TaskStatus;
}

export interface DeleteTaskCommand {
  uuid: string | undefined;
}

export enum TaskStatus {
  NotDone = "NOT_DONE",
  Done = "DONE"
}

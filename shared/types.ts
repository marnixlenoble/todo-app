export interface ITask {
  uuid: string;
  index?: number;
  title: string;
  status: string;
}

export interface IUser {
  uuid: string;
  name: string;
}

export interface IUserInput {
  username: string;
}

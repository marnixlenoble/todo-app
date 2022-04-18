import { IUser } from "shared/types";
import { v4 as uuid } from "uuid";

import { ErrorMessages } from "./constants";

class UserService {
  private _users: Record<string, IUser>;
  private _currentUser: IUser | undefined;

  constructor() {
    this._users = {};
    this._currentUser = undefined;
  }

  get(name: string): IUser | undefined {
    return this._users[name];
  }

  create(name: string): IUser {
    if (this.get(name))
      throw new Error(ErrorMessages.ResourceAlreadyExists);

    const user = { uuid: uuid(), name };
    this._users[user.name] = user;

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

export { UserService };

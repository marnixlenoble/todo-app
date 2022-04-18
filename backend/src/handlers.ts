import { IUser } from "shared/types";

import { UserService } from "./services";
import { LoginCommand } from "./types";

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


export { LoginHandler };

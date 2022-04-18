import { UserService } from "./services";
import { LoginHandler } from "./handlers";
import Bottle from "bottlejs";

const bottle = new Bottle();

bottle.service("userService", UserService);
bottle.service("loginHandler", LoginHandler, "userService");

const container = bottle.container;
export { container };

import { UserService, TaskService } from "./services";
import { LoginHandler } from "./handlers";
import Bottle from "bottlejs";

const bottle = new Bottle();

bottle.service("taskService", TaskService);
bottle.service("userService", UserService, "taskService");

bottle.service("loginHandler", LoginHandler, "userService");

const container = bottle.container;
export { container };

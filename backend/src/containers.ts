import { UserService, TaskService } from "./services";
import {
  LoginHandler,
  ListTasksHandler,
  CreateTaskHandler,
  UpdateTaskHandler,
  DeleteTaskHandler,
  GetRandomNameHandler,
} from "./handlers";
import Bottle from "bottlejs";

const bottle = new Bottle();

bottle.service("taskService", TaskService);
bottle.service("userService", UserService, "taskService");

bottle.service("loginHandler", LoginHandler, "userService");
bottle.service(
  "listTasksHandler",
  ListTasksHandler,
  "taskService",
  "userService"
);
bottle.service(
  "createTaskHandler",
  CreateTaskHandler,
  "taskService",
  "userService"
);
bottle.service(
  "updateTaskHandler",
  UpdateTaskHandler,
  "taskService",
  "userService"
);
bottle.service(
  "deleteTaskHandler",
  DeleteTaskHandler,
  "taskService",
  "userService"
);
bottle.service("getRandomNameHandler", GetRandomNameHandler);

const container = bottle.container;
export { container };

import { Router } from "express";

import { container } from "../containers";
import {
  ListTasksHandler,
  CreateTaskHandler,
  UpdateTaskHandler,
  DeleteTaskHandler,
  GetRandomNameHandler,
} from "../handlers";
import {
  ListTasksCommand,
  CreateTaskCommand,
  UpdateTaskCommand,
  DeleteTaskCommand,
} from "../types";
import { UserService } from "../services";

const router = Router();

router.use((req, res, next) => {
  const service: UserService = container.userService;
  service.currentUser = service.get(req.header("username") ?? "");
  next();
});

router.get("/", function (req, res) {
  const command: ListTasksCommand = {
    searchKeyWord: req?.query?.searchKeyWord as string | undefined,
  };
  const handler: ListTasksHandler = container.listTasksHandler;

  const tasks = handler.handle(command);

  res.send(tasks);
});

router.post("/create", function (req, res) {
  const command: CreateTaskCommand = { title: req?.body?.title };
  const handler: CreateTaskHandler = container.createTaskHandler;

  const task = handler.handle(command);

  res.send(task);
});

router.post("/update", function (req, res) {
  const command: UpdateTaskCommand = {
    uuid: req?.body?.uuid,
    title: req?.body?.title,
    status: req?.body?.status,
  };
  const handler: UpdateTaskHandler = container.updateTaskHandler;

  const task = handler.handle(command);

  res.send(task);
});

router.post("/delete", function (req, res) {
  const command: DeleteTaskCommand = { uuid: req?.body?.uuid };
  const handler: DeleteTaskHandler = container.deleteTaskHandler;

  handler.handle(command);

  res.send({});
});

router.get("/random-name", function (req, res) {
  const handler: GetRandomNameHandler = container.getRandomNameHandler;

  const randomName = handler.handle();

  res.send({ randomName });
});

export default router;

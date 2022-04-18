import { Router } from "express";
import { container } from "../containers";
import { LoginHandler } from "../handlers";
import { LoginCommand } from "../types";

const router = Router();

router.post("/login", function (req, res) {
  const command: LoginCommand = { username: req?.body?.username };
  const handler: LoginHandler = container.loginHandler;

  const user = handler.handle(command);

  res.send(user);
});

export default router;

import { Router } from "express";

const router = Router();

router.get("/", function (req, res) {
  res.send();
});

router.post("/create", function (req, res) {
   res.send();
});

router.post("/update", function (req, res) {
   res.send();
});

router.post("/delete", function (req, res) {
    res.send();
});

router.get("/random-name", function (req, res) {
  res.send();
});

export default router;

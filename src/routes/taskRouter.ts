import express from "express";
import { Task } from "../entities/Task";
import { getManager } from "typeorm";

const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await getManager()
    .getRepository(Task)
    .createQueryBuilder("task").skip(4).limit(2)
    .getMany();

  return res.status(200).json({
    status: "success",
    tasks,
  });
});

router.post("/", async (req, res) => {
  const { tasks } = req.body;

  await getManager().insert(Task, [
    ...tasks
  ])

  return res.status(200).json({
    status: "success",
    msg: "Create tasks success"
  });
});

router.delete("/:taskId", async (req, res) => {
  const {taskId} = req.params

  await getManager().delete(Task, {
    
  })
})

export { router as taskRouter };

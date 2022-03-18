import express from "express";
import { createQueryBuilder } from "typeorm";
import { Client } from "../entities/Client";
const router = express.Router();

router.get("/api/bankers", async (req, res) => {
  const client = await createQueryBuilder("client")
    .select("client.first_name")
    .addSelect("client.balance")
    .from(Client, "client")
    .leftJoinAndSelect("client.transactions", "transactions")
    .where("client.balance >= :balance", { balance: 500000 })
    .getMany();

  return res.json({
    client,
  });
});

export { router as fetchClientRouter };

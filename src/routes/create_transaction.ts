import express from "express";
import { Client } from "../entities/Client";
import { TranSaction, TransactionTypes } from "../entities/Transacttion";

const router = express.Router();

router.post("/api/client/:clientId/transaction", async (req, res) => {
  const { clientId } = req.params;

  const { type, amount } = req.body;

  const client = await Client.findOne(parseInt(clientId));

  if (!client) {
    return res.json({
      msg: "Client not found",
    });
  }

  const transaction = TranSaction.create({
    amount,
    type,
    client,
  });

  await transaction.save();

  if (type === TransactionTypes.DEPOSIT) {
    client.balance = client.balance + amount;
  } else {
    client.balance = client.balance - amount;
  }

  await client.save();

  return res.json({
    msg: "Transaction added",
    transaction,
  });
});

export { router as createTransactionRouter };

import express from "express";
import { Client } from "../entities/Client";
import { Banker } from "../entities/Banker";

const router = express.Router();

router.put("/api/banker/:bankderId/client/:clientId", async (req, res) => {
  const { bankderId, clientId } = req.params;

  const client = await Client.findOne(parseInt(clientId));

  const banker = await Banker.findOne(parseInt(bankderId));

  if (!banker || !client) {
    return res.json({
      msg: "Banker or client not found",
    });
  }

  banker.clients = [client];

  await banker.save();

  return res.json({
    msg: "banker connectwed to client",
  });
});

export { router as connectBankerToClient };

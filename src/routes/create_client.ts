import express from "express";
import { Client } from "../entities/Client";

const router = express.Router();

router.post("/api/client", async (req, res) => {
  const { firstName, lastName, email, cardNumber, balance, middleName } = req.body;

  const client = Client.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    balance,
    middle_name: middleName
  });

  await client.save();

  return res.status(200).json({
    status: "success",
    client,
  });
});

export { router as createClientRouter };

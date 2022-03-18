import express from "express";
import { Banker } from "../entities/Banker";

const router = express.Router();

router.post("/api/banker", async (req, res) => {
  const { firstName, lastName, email, cardNumber, employeeNumber, middleName, balance } = req.body;

  const banker = Banker.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    employee_number: employeeNumber,
    middle_name: middleName, 
    balance
  });

  await banker.save();

  return res.status(200).json({
    status: "success",
    banker,
  });
});

export { router as createBankerRouter };

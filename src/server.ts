import { createConnection } from "typeorm";
import { Banker } from "./entities/Banker";
import { Client } from "./entities/Client";
import { TranSaction } from "./entities/Transacttion";
import express from "express";
import { createClientRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";
import { createTransactionRouter } from "./routes/create_transaction";
import { connectBankerToClient } from "./routes/connect_banker_to_client";
import { deleteClientRouter } from "./routes/delete_client";
import { fetchClientRouter } from "./routes/fetch_client";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "161201",
      database: "learn",
      entities: [Client, Banker, TranSaction],
      synchronize: true,
    });
    console.log("Connected to Postgres");

    app.use(createClientRouter);
    app.use(createBankerRouter);
    app.use(createTransactionRouter);
    app.use(connectBankerToClient);
    app.use(deleteClientRouter);
    app.use(fetchClientRouter);

    app.listen(3000, () =>
      console.log("Server listent at http://localhost:3000")
    );
  } catch (error) {
    console.error(error);
    throw new Error("Unable to connect to db");
  }
};

main();

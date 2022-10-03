import {Express, Request, Response} from "express";
import express from "express";
import * as path from "path";
import { Pool } from "pg"
import { config as configureDotenv } from "dotenv"
import { initState } from "./state"

const startServer = async (port: number) => {
  configureDotenv()
  const pool = new Pool({
    connectionString: process.env.PGURI,
    ssl: {
      rejectUnauthorized: false
    }
  })

  const app: Express = express();
  const state = await initState(pool)

  app.use(express.static(path.resolve("./") + "/build/frontend"));

  app.get("/api", (request: Request, response: Response): void => {
    response.send("Poulsen Concrete Contractors Inc.");
    console.log("/api")
  });

  app.get("/api/getEmployees", (req: Request, response: Response) => {
    response.send(state.employees)
    console.log("/api/getEmployees")
  })

  app.get("*", (request: Request, response: Response): void => {
    response.sendFile(path.resolve("./") + "/build/frontend/index.html");
  });

  app.listen(port, () => console.log(`Server listening on port ${port}!`));
}

export default startServer

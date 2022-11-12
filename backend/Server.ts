import express, {Express, Request, Response} from "express";
import { config as configureDotenv } from "dotenv"
import * as path from "path";
import { Pool } from "pg"
import cors from "cors"
import { fetchEmployees, getHoursByMonth } from "./dbRequestManager";
import { initState } from "./state"
import { HourRow } from "types";
import { getMonthInfoString } from "./common";

const startServer = async (port: number) => {
  configureDotenv()
  const pool = new Pool({
    connectionString: process.env.PGURI,
    ssl: { rejectUnauthorized: false },
  })

  const app: Express = express();
  const state = await initState(pool)

  app.use(express.static(path.resolve("./") + "/build/frontend"));
  app.use(cors())

  app.get("/api", (request: Request, response: Response): void => {
    response.send("Poulsen Concrete Contractors Inc.");
    console.log("/api")
  });

  app.get("/api/employees", async (request: Request, response: Response) => {
    console.log("/api/fetchEmployees")
    if (state.employees.length === 0)
      state.employees = await fetchEmployees(await pool.connect())

    response.send(state.employees)
  })

  app.get("/api/employees/hours/month", async (request: Request, response: Response) => {
    const { month, year } = request.query
    const monthInfoString = getMonthInfoString(Number(month), Number(year))

    // get the hours from the state if we have already fetched it
    if (state.monthOfHours[monthInfoString]) {
      console.log(`/api/employees/hours/month -> from cache: ${monthInfoString}`)
      response.send(state.monthOfHours[monthInfoString])
      return
    }

    console.log(`/api/employees/hours/month -> fetching: ${monthInfoString}`)
    const hours: HourRow[] =
      await getHoursByMonth(await pool.connect(), Number(month), Number(year))

    // add hours to the cache
    state.monthOfHours[monthInfoString] = hours

    response.send(hours)
  })

  app.get("*", (request: Request, response: Response): void => {
    response.sendFile(path.resolve("./") + "/build/frontend/index.html");
  });

  app.listen(port, () => console.log(`Server listening on port ${port}!`));
}

export default startServer

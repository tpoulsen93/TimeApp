import cors from "cors"
import { Pool } from "pg"
import * as path from "path";
import { config as configureDotenv } from "dotenv"
import express, {Express, Request, Response} from "express";
import { fetchEmployees, getHoursByMonth, submitHoursToTimeBot } from "./requestManager";
import { getMonthInfoString } from "./common";
import { initState } from "./state"
import { HourRow } from "types";

const startServer = async (port: number) => {
  configureDotenv()
  const pool = new Pool({
    connectionString: process.env.PGURI,
    ssl: { rejectUnauthorized: false },
  })

  const app: Express = express();
  const cache = await initState(pool)

  app.use(express.static(path.resolve("./") + "/build/frontend"));
  app.use(cors())

  app.get("/api", (req: Request, res: Response): void => {
    res.send("Poulsen Concrete Contractors Inc.");
    console.log("/api")
  });

  app.get("/api/employees", async (req: Request, res: Response) => {
    console.log("/api/fetchEmployees")
    if (cache.employees.length === 0)
      cache.employees = await fetchEmployees(await pool.connect())

    res.send(cache.employees)
    res.end()
  })

  app.get("/api/employees/hours/month", async (req: Request, res: Response) => {
    const { month, year } = req.query
    const monthInfoString = getMonthInfoString(Number(month), Number(year))

    // get the hours from the cache if we have already fetched it
    if (cache.monthOfHours[monthInfoString]) {
      console.log(`/api/employees/hours/month -> from cache: ${monthInfoString}`)
    } else {
      console.log(`/api/employees/hours/month -> fetching: ${monthInfoString}`)
      const hours: HourRow[] =
        await getHoursByMonth(await pool.connect(), Number(month), Number(year))

      // add hours to the cache
      cache.monthOfHours[monthInfoString] = hours
    }

    res.send(cache.monthOfHours[monthInfoString])
    res.end()
  })

  app.get("/api/employees/time/submission", async (req: Request, res: Response) => {
    console.log("submit hours")
    const { id, date, hours } = req.query
    const response = await submitHoursToTimeBot(Number(id), date as string, Number(hours))
    res.send(response)
    res.end()
  })

  app.get("*", (req: Request, res: Response): void => {
    res.sendFile(path.resolve("./") + "/build/frontend/index.html");
  });

  app.listen(port, () => console.log(`Server listening on port ${port}!`));
}

export default startServer

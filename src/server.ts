import "dotenv/config"
import express, { Request, Response } from "express"
import { processEvent } from "./engine/rewardProcessor"
import { employees, rewardGrants, rules } from "./store"
import { Event, Rule } from "./types"

const app = express()
app.use(express.json())

app.post("/rules", (req: Request, res: Response) => {
  const rule: Rule = req.body

  if (!rule.name || !rule.eventType || !rule.condition || rule.points == null) {
    return res.status(400).json({ error: "Invalid rule format" })
  }

  rules.push(rule)
  res.status(201).json(rule)
})

app.get("/rules", (_req: Request, res: Response) => {
  res.json(rules)
})

app.put("/rules/:name", (req: Request, res: Response) => {
  const { name } = req.params
  const updatedRule: Rule = req.body

  const index = rules.findIndex(r => r.name === name)

  if (index === -1) {
    return res.status(404).json({ error: "Rule not found" })
  }

  rules[index] = updatedRule
  res.json(updatedRule)
})

app.post("/events", (req: Request, res: Response) => {
  const events: Event[] = req.body

  if (!Array.isArray(events)) {
    return res.status(400).json({ error: "Expected an array of events" })
  }

  for (const event of events) {
    if (!event.id || !event.employeeId || !event.type) {
      return res.status(400).json({ error: "Invalid event format" })
    }

    processEvent(event, rules)
  }

  res.json({
    rewardGrants,
    employees
  })
})

app.get("/employees", (_req: Request, res: Response) => {
  res.json(employees)
})

const port = Number(process.env.PORT) || 3000

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

import { events, rewardGrants, employees } from "../store"
import { Event, Rule } from "../types"
import { evaluateCondition } from "./evaluteCondition"

export function processEvent(event: Event, rules: Rule[]) {

    if (events.some(e => e.id === event.id)) {
      return
    }
  
    events.push(event)
  
    for (const rule of rules) {
  
      if (!rule.active) continue
      if (rule.eventType !== event.type) continue
      if (!evaluateCondition(rule.condition, event)) continue
  
      const alreadyApplied = rewardGrants.some(
        grant =>
          grant.eventId === event.id &&
          grant.ruleName === rule.name
      )
  
      if (alreadyApplied) continue
  
      let employee = employees.find(e => e.id === event.employeeId)
  
      if (!employee) {
        employee = {
          id: event.employeeId,
          name: "Auto-created",
          point_balance: 0
        }
        employees.push(employee)
      }
  
      rewardGrants.push({
        eventId: event.id,
        ruleName: rule.name,
        employeeId: event.employeeId,
        points: rule.points
      })
  
      employee.point_balance += rule.points
    }
  }
  
  
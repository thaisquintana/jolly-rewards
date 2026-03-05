const test = require("node:test")
const assert = require("node:assert/strict")

const { processEvent } = require("../dist/engine/rewardProcessor")
const { employees, rules, events, rewardGrants } = require("../dist/store")

test("awards points when an active matching rule is satisfied", () => {
  employees.length = 0
  rules.length = 0
  events.length = 0
  rewardGrants.length = 0

  employees.push({
    id: "emp-1",
    name: "Thais",
    point_balance: 0
  })

  rules.push({
    name: "Correct clock-in method",
    eventType: "clock_in",
    active: true,
    points: 10,
    condition: {
      field: "metadata.correct_method",
      operator: "==",
      value: true
    }
  })

  processEvent(
    {
      id: "evt-1",
      employeeId: "emp-1",
      type: "clock_in",
      timestamp: "2026-03-04T12:00:00.000Z",
      metadata: { correct_method: true }
    },
    rules
  )

  assert.equal(rewardGrants.length, 1)
  assert.equal(rewardGrants[0].eventId, "evt-1")
  assert.equal(rewardGrants[0].ruleName, "Correct clock-in method")
  assert.equal(employees[0].point_balance, 10)
})

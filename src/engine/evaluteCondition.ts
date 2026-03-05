import { Condition, Event, Operator } from "../types"

const operators: Record<Operator, (a: any, b: any) => boolean> = {
    "==": (a, b) => a === b,
    "!=": (a, b) => a !== b,
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
  }

  function getValue(obj: unknown, path: string): unknown {
    return path
      .split(".")
      .reduce((acc: any, key) => acc?.[key], obj)
  }
  
  export function evaluateCondition(condition: Condition, event: Event) {
    const value = getValue(event, condition.field)
    const operatorFn = operators[condition.operator]
  
    if (!operatorFn) {
      throw new Error(`Unsupported operator: ${condition.operator}`)
    }
  
    return operatorFn(value, condition.value)
  }